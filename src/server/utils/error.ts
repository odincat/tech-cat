import { Role } from "@prisma/client";

export class ValidationError extends Error {
    code = 'TC_VALIDATION';
    extensions: Record<string, Record<string, string>>;


    constructor(message: string, properties: Record<string, string>) {
        super(message);

        this.name = 'Validation';
        Object.defineProperty(this, 'name', { value: 'ValidationError' });

        this.extensions = {
            properties
        }
    }
}

export class NotFoundError extends Error {
    code = 'TC_NOT_FOUND';

    constructor(message: string) {
        super(message);

        this.name = 'NotFound';
        Object.defineProperty(this, 'name', { value: 'NotFoundError' });
    }
}

export class FormatError extends Error {
    code = 'TC_FORMAT_INVALID';

    constructor(message: string) {
        super(message);

        this.name = 'FormatError';
        Object.defineProperty(this, 'name', { value: 'FormatError' });
    }
}

export class PermissionError extends Error {
    code = 'TC_PERMISSION_DENIED';

    constructor(requiredPermission: Role) {
        super(`You must have to role "${requiredPermission}" to perform this action`);

        this.name = 'PermissionError';
        Object.defineProperty(this, 'name', { value: 'PermissionError' });
    }
}