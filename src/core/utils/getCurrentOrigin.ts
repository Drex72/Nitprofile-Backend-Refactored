import { config } from ".."

const getCurrentOrigin = () => {
    switch (config.appEnvironment) {
        case "development":
            return config.urls.devOrigin
        case "staging":
            return config.urls.stagingOrigin
        case "production":
            return config.urls.liveOrigin
    }
}


export const currentOrigin = getCurrentOrigin()
