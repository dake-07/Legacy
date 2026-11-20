/**
 * Centralized Web3Forms Submission Client
 *
 * Provides a unified, type-safe interface for sending contact, consultation,
 * and booking forms via Web3Forms (https://web3forms.com/).
 *
 * You can set your access key in an environment variable `VITE_WEB3FORMS_ACCESS_KEY`
 * or replace the fallback key below.
 */

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

// Default fallback key - users can override via VITE_WEB3FORMS_ACCESS_KEY in .env
const nodeEnv = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })?.process?.env

export const WEB3FORMS_ACCESS_KEY =
  nodeEnv?.VITE_WEB3FORMS_ACCESS_KEY ||
  import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY ||
  '479d1615-59d6-4c3b-a75a-73a201f5e05d'





export interface Web3FormsResponse {
  success: boolean
  message: string
}

export async function submitToWeb3Forms(data: Record<string, unknown>): Promise<Web3FormsResponse> {
  const accessKey = WEB3FORMS_ACCESS_KEY

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      access_key: accessKey,
      from_name: 'Legacy Growth & Development Hub',
      ...data
    })
  })

  if (!response.ok) {
    throw new Error(`Web3Forms HTTP error: ${response.status}`)
  }

  const result = (await response.json()) as Partial<Web3FormsResponse>
  if (result.success !== true) {
    throw new Error(result.message || 'Web3Forms submission failed')
  }

  return result as Web3FormsResponse
}
