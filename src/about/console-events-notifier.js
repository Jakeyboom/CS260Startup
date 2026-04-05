const ConsoleEvent = {
    ACCOUNT_CREATED: 'ACCOUNT_CREATED',
    CLASS_CREATED: 'CLASS_CREATED',
    ASSIGNMENT_CREATED: 'ASSIGNMENT_CREATED',
    ASSIGNMENT_EDITED: 'ASSIGNMENT_EDITED',
    CLASS_EDITED: 'CLASS_EDITED'
    
}

class ConsoleMessage {
    constructor(user, messageType, userClassName, userAssignmentName) {
        this.user = user;
        this.messageType = messageType;
        this.userClassName = userClassName;
        this.userAssignmentName = userAssignmentName;
    }
}

class ConsoleEventNotifier {
    consoleEvents = [];
    handlers = [];

    addConsoleEvent(user, messageType, userClassName, userAssignmentName) {
        const consoleMessage = new ConsoleMessage(user, messageType, userClassName, userAssignmentName);
        this.consoleEvents.push(consoleMessage);
        this.handlers.forEach((handler) => handler(consoleMessage));

    }


    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }

    broadcastEvent(user, messageType, userClassName, userAssignmentName) {
        const consoleMessage = new ConsoleMessage(user, messageType, userClassName, userAssignmentName);
        this.consoleEvents.push(consoleMessage);
        this.handlers.forEach((handler) => handler(consoleMessage));
    }
}

const ConsoleNotifier = new ConsoleEventNotifier();
export {ConsoleMessage, ConsoleNotifier};