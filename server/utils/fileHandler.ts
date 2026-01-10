import fs from 'node:fs'
import path from 'node:path'
import dayjs from 'dayjs'


export const saveImageLocally = (file: any) => {
    // Валідація
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) return null

    // Форматування назви 
    const timestamp = dayjs().format('DDMMYYYY-HHmmss_SSS')
    const fileName = `${timestamp}-${file.filename}`

    // Шлях до директорії
    const uploadDir = path.resolve(process.cwd(), 'public')
    const filePath = path.join(uploadDir, fileName)

    // Запис файлу на диск
    fs.writeFileSync(filePath, file.data)

    // Повертаємо лише назву файлу для запису в БД
    return fileName


}