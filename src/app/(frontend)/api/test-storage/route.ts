import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

  // Step 1: Test Direct S3
  let directS3Result = 'not-run'
  try {
    const s3 = new S3Client({
      endpoint,
      forcePathStyle: true,
      region,
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    })
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: 'test-direct-s3.txt',
        Body: 'ok',
        ContentType: 'text/plain',
      }),
    )
    directS3Result = 'success'
  } catch (err: unknown) {
    const error = err as { name?: string; message?: string }
    directS3Result = `failed: ${error.name} - ${error.message}`
  }

  // Step 2: Test Payload create on Media collection
  let payloadCreateResult: unknown = null
  let payloadCreateError: unknown = null
  try {
    const payload = await getPayload({ config })
    const valid1x1Jpeg = Buffer.from(
      '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
      'base64',
    )
    const result = await payload.create({
      collection: 'media',
      data: {
        alt: 'Teste de diagnóstico automático',
      },
      file: {
        data: valid1x1Jpeg,
        name: 'teste-diagnostico.jpg',
        mimetype: 'image/jpeg',
        size: valid1x1Jpeg.length,
      },
      overrideAccess: true,
    })
    payloadCreateResult = {
      id: result.id,
      url: result.url,
      filename: result.filename,
    }
  } catch (err: unknown) {
    const error = err as { name?: string; message?: string; stack?: string; errors?: unknown[] }
    payloadCreateError = {
      name: error.name || 'Error',
      message: error.message,
      stack: error.stack,
      errors: error.errors,
    }
  }

  return NextResponse.json({
    diagnostics,
    directS3Result,
    payloadCreateResult,
    payloadCreateError,
  })
}


