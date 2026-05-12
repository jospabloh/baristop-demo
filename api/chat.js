export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, system } = req.body

  if (!messages || !system) {
    return res.status(400).json({ error: 'Missing messages or system' })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      content: [{ type: 'text', text: 'Error: API key no configurada en Vercel.' }]
    })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system,
        messages,
      }),
    })

    const data = await response.json()

    if (data.type === 'error') {
      console.error('Anthropic API error:', data.error)
      return res.status(200).json({
        content: [{ type: 'text', text: `Error de Anthropic: ${data.error?.message || 'desconocido'}` }]
      })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Handler error:', err)
    return res.status(200).json({
      content: [{ type: 'text', text: `Error de conexión: ${err.message}` }]
    })
  }
}
