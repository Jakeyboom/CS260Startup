const ConsoleEvent = {
    ACCOUNT_CREATED: 'ACCOUNT_CREATED',
    CLASS_CREATED: 'CLASS_CREATED',
    ASSIGNMENT_CREATED: 'ASSIGNMENT_CREATED',
    
}

class ConsoleMessage {
    constructor(user, message, userClassName, userAssignmentName) {
        this.user = user;
        this.message = message;
        this.userClassName = userClassName;
        this.userAssignmentName = userAssignmentName;
    }
}

class ConsoleEventNotifier {
    consoleEvents = [];
    handlers = [];

    constructor() {
        const userName = getCurrentUser();
    }


    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }

    broadcastEvent(user, message, userClassName, userAssignmentName) {
        const consoleMessage = new ConsoleMessage(user, message, userClassName, userAssignmentName);
        this.consoleEvents.push(consoleMessage);
        this.handlers.forEach((handler) => handler(consoleMessage));
    }
}

const ConsoleNotifier = new ConsoleEventNotifier();
export {C}