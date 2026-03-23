import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { Resend } from 'resend'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server',
        configureServer(server) {
          server.middlewares.use(async (req: any, res: any, next: any) => {
            if (req.url === '/api/send' && req.method === 'POST') {
              console.log('--- LOCAL API CALL RECEIVED ---')
              if (!env.RESEND_API_KEY) {
                console.error('ERROR: RESEND_API_KEY is not defined in .env!')
              }

              let body = ''
              req.on('data', (chunk: any) => { body += chunk })
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body)
                  console.log('Sending email with data:', data)
                  const resend = new Resend(env.RESEND_API_KEY)
                  const result = await resend.emails.send({
                    from: 'onboarding@resend.dev',
                    to: ['work.ashish00@gmail.com'],
                    subject: `New Contact Form Message from ${data.name}`,
                    html: `<p><strong>Name:</strong> ${data.name}</p>
                           <p><strong>Email:</strong> ${data.email}</p>
                           <p><strong>Message:</strong> ${data.message}</p>`,
                  })
                  console.log('Resend Response:', result)

                  if (result.error) {
                    res.statusCode = 400
                    return res.end(JSON.stringify({ error: result.error.message || 'Resend API Error' }))
                  }

                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true, result }))
                } catch (error) {
                  console.error('Local API Error (Sending):', error)
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: 'Failed to send email locally', details: error instanceof Error ? error.message : String(error) }))
                }
              })
              return
            }
            next()
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
