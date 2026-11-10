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

  // Step 1: Test Direct S3 without ACL
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

  // Step 1B: Test Direct S3 WITH ACL 'public-read' (Supabase often rejects ACLs)
  let s3WithAclResult = 'not-run'
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
        Key: 'test-acl.txt',
        Body: 'ok acl',
        ContentType: 'text/plain',
        ACL: 'public-read',
      }),
    )
    s3WithAclResult = 'success'
  } catch (err: unknown) {
    const error = err as { name?: string; message?: string; Code?: string; $metadata?: { httpStatusCode?: number } }
    s3WithAclResult = `failed: ${error.name} - ${error.message} (${error.Code || error.$metadata?.httpStatusCode})`
  }

  // Step 1C: Test Sharp image processing on Linux
  let sharpResult = 'not-run'
  try {
    const sharp = (await import('sharp')).default
    const testBuffer = Buffer.from(
      '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=',
      'base64',
    )
    const meta = await sharp(testBuffer).metadata()
    sharpResult = `success: format=${meta.format}, width=${meta.width}, height=${meta.height}`
  } catch (err: unknown) {
    const error = err as { name?: string; message?: string }
    sharpResult = `failed: ${error.name} - ${error.message}`
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
    const error = err as any
    const rawProps: Record<string, unknown> = {}
    if (error && typeof error === 'object') {
      for (const key of Object.getOwnPropertyNames(error)) {
        try {
          rawProps[key] = error[key]
        } catch {
          rawProps[key] = 'unserializable'
        }
      }
    }
    payloadCreateError = {
      name: error?.name || 'Error',
      message: error?.message,
      data: error?.data,
      originalError: error?.data?.originalError ? String(error.data.originalError?.message || error.data.originalError) : null,
      cause: error?.cause ? {
        name: error.cause?.name,
        message: error.cause?.message,
        code: error.cause?.code || error.cause?.Code,
        status: error.cause?.$metadata?.httpStatusCode,
      } : null,
      errors: error?.errors,
      stack: error?.stack?.split('\n').slice(0, 10),
      rawProps,
    }
  }

  return NextResponse.json({
    diagnostics,
    directS3Result,
    s3WithAclResult,
    sharpResult,
    payloadCreateResult,
    payloadCreateError,
  })
}


