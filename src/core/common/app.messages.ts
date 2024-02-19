export const AppMessages = {
    FAILURE: {
        INVALID_TOKEN_PROVIDED: "Invalid token provided.",
        INVALID_CREDENTIALS: "Invalid credentials provided.",
        EMAIL_EXISTS: "This account already exists, kindly login",
        EMAIL_NOT_VERIFIED: "Please verify your email address",
        FORBIDDEN_RESOURCE: "Forbidden Resource. You do not have the required permissions to access this resource",
        PROGRAM_EXISTS: "This Program already exists",
        INVALID_PROGRAM: "This Program doesn't exist",
        INVALID_PROGRAM_NODE: "This Program Node doesn't exist",
        START_DATE_ERROR: "Start Date cannot be earlier than Current date",
        DATE_DURATION_ERROR: "Start Date cannot be later than End date",
        USER_ALREADY_ASSIGNED_TO_PROGRAM: "User already exists in this program",
        INVALID_PROFILE_PICTURE: "You must have a profile picture before you can generate your profile. kindly update your profile picture.",
    },
    SUCCESS: {
        LOGIN: "Login successful.",
        LOGOUT: "Logged out successfully.",
        SIGNUP: "Signup successful",
        EMAIL_SENT: "If you have an account with us, You will receive a mail to",
        PASSWORD_RESET: "Password reset successfully",
        TOKEN_REFRESHED: "Token Refreshed Successfully",
        DATA_FETCHED: "Data Retreived Successfully",
        PROGRAM_CREATED: "Program created successfully",
        PROGRAM_UPDATED: "Program updated successfully",
        PROGRAM_DELETED: "Program deleted successfully",

        PROGRAM_NODE_CREATED: "Program Node created successfully",
        PROGRAM_NODE_UPDATED: "Program Node updated successfully",
        PROGRAM_NODE_DELETED: "Program Node deleted successfully",

        USERS_REGISTERED_SUCCESSFULLY: "Users registered for program successfully",
    },
    INFO: {
        INVALID_OPERATION: "Invalid operation.",
        EMPTY_TOKEN_HEADER: "Invalid authorization header",
    },
}
