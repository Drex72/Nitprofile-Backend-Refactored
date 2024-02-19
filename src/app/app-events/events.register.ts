import { sendEmail } from "@/mails"
import { config, logger } from "@/core"
import { sendNewUserMail } from "@/programs/listeners"

/**
 * Event Listener Registry.
 */
export const register = {
    "app:up": () => {
        logger.info(`Server started successfully on port ${config.port}`)
        config.appEnvironment !== "development" && console.log(`Server started successfully on port ${config.port}`)
        const memoryUsage = process.memoryUsage()
        logger.info(`Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB`)
    },
    "event:registeration:succesful": () => logger.info("Events listeners registered"),

    "event:sendMail": sendEmail,
    "event:sendNewUserMail": sendNewUserMail.handle,
}
