#!/usr/bin/env node

import { intro, text, select, cancel, outro, isCancel } from '@clack/prompts';
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

function emptyDir(dirPath) {
    const dir = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const file of dir) {
        const filePath = path.resolve(dirPath, file.name)

        fs.rmSync(filePath, { recursive: true, force: true })
    }
}

async function start() {
    intro("Noctes.jsx - Starter Template")

    let dir = await text({
        message: "Project name (target directory):",
        placeholder: "noctes-project",
        defaultValue: "noctes-project"
    })

    if (isCancel(dir)) {
        cancel("Operation cancelled.")
        process.exit()
    }

    const resolvedDir = path.resolve(process.cwd(), dir);
    const relativePath = path.relative(process.cwd(), dir)

    if (fs.existsSync(resolvedDir)) {
        const stats = fs.statSync(resolvedDir)

        if (!stats.isDirectory()) {
            cancel("This path is not a directory.")
            return
        }

        let result = await select({
            message: "Path is already in use. What do you want to do?",
            options: [
                {
                    value: "overwrite",
                    label: "Remove files and continue"
                },
                {
                    value: "ignore",
                    label: "Ignore files and continue"
                },
                {
                    value: "cancel",
                    label: "Cancel operation"
                }
            ],
            required: true
        })

        if (isCancel(result)) result = "cancel"

        switch (result) {
            case "overwrite": {
                emptyDir(resolvedDir)
                break;
            }

            case "ignore": {
                break;
            }

            case "cancel": {
                cancel("Operation cancelled.")
                process.exit()
            }
        }
    } else {
        fs.mkdirSync(resolvedDir)
    }

    fs.cpSync(path.resolve(
        fileURLToPath(import.meta.url),
        "../template"
    ), resolvedDir, { recursive: true })

    let outroMessage = "Done. Now run:\n"

    if (relativePath.length > 0) {
        outroMessage += `\n   cd ${relativePath}`
    }

    outroMessage += "\n   npm install\n   npm run dev"

    outro(outroMessage)
}

start()