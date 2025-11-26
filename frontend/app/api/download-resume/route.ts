import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
    try {
        const filePath = join(process.cwd(), 'public', 'John_a_Igbokwe_Resume.pdf')
        const fileBuffer = await readFile(filePath)

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="John_Igbokwe_Resume.pdf"; filename*=UTF-8\'\'John_Igbokwe_Resume.pdf',
                'Cache-Control': 'no-cache',
            },
        })
    } catch (error) {
        console.error('Error downloading resume:', error)
        return new NextResponse('File not found', { status: 404 })
    }
}
