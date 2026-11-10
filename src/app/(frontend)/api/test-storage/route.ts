import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET?.trim() || 'site-media'
  let endpoint = process.env.SUPABASE_STORAGE_S3_ENDPOINT?.trim()
  if (endpoint && !endpoint.startsWith('http://') && !endpoint.startsWith('https://')) {
    endpoint = `https://${endpoint}`
  }
  const region = process.env.SUPABASE_STORAGE_S3_REGION?.trim() || 'sa-east-1'
  const accessKeyId = process.env.SUPABASE_STORAGE_S3_ACCESS_KEY_ID?.trim()
  const secretAccessKey = process.env.SUPABASE_STORAGE_S3_SECRET_ACCESS_KEY?.trim()

  const diagnostics = {
    bucket,
    endpoint,
    region,
    hasAccessKeyId: Boolean(accessKeyId),
    accessKeyIdLength: accessKeyId ? accessKeyId.length : 0,
    accessKeyIdPreview: accessKeyId ? `${accessKeyId.substring(0, 6)}...` : null,
    hasSecretAccessKey: Boolean(secretAccessKey),
    secretAccessKeyLength: secretAccessKey ? secretAccessKey.length : 0,
  }

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    return NextResponse.json(
      {
        success: false,
        error: 'Variáveis de ambiente do Supabase Storage incompletas na Hostinger.',
        diagnostics,
      },
      { status: 400 },
    )
  }

  try {
    const s3 = new S3Client({
      endpoint,
      forcePathStyle: true,
      region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    })

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: 'test-connection.txt',
        Body: 'teste de conexao ok',
        ContentType: 'text/plain',
      }),
    )

    return NextResponse.json({
      success: true,
      message: 'Conexão e upload com o Supabase Storage S3 funcionaram perfeitamente!',
      diagnostics,
    })
  } catch (err: unknown) {
    const error = err as { name?: string; message?: string; Code?: string; $metadata?: { httpStatusCode?: number } }
    return NextResponse.json(
      {
        success: false,
        errorName: error.name || 'UnknownError',
        errorMessage: error.message || String(err),
        errorCode: error.Code || error.$metadata?.httpStatusCode,
        diagnostics,
      },
      { status: 500 },
    )
  }
}

