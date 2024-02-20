import { StatusCodes } from 'http-status-codes';

export class AppError {
  private _message: string;
  private _status: number;

  constructor(message: string, status: number = StatusCodes.BAD_REQUEST) {
    this._message = message;
    this._status = status;
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status;
  }
}