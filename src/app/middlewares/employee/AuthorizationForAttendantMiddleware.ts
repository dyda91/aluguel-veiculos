import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { employeeRepository } from '../../../infra/db/sequelize/repositories/employeeRepository';
import { AppError } from '../../errors/AppError';
import { employeePositionRepository } from '../../../infra/db/sequelize/repositories/employeePositionRepository';

class AuthorizationByAttendantMiddleware {
    async authorization(req: Request, res: Response, next: NextFunction) {
        try {
            const authorizationHeader = req.header('Authorization');
            const accessToken = authorizationHeader.split(' ')[1];
            const secret = process.env.JWT_SECRET!;
            const decodedToken: any = jwt.verify(accessToken, secret);

            const positionDecoded = decodedToken.position;
            const idDecoded = decodedToken.id;

            const employee = await employeeRepository.findById(idDecoded);
            const position = await employeePositionRepository.findById(positionDecoded);

            if (!employee) {
                res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            else if (!positionDecoded) {
                res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            else if (employee.position != positionDecoded) {
                res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            else if (employee.position != position.id) {
                res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            else if (position.name.toLocaleUpperCase() != 'MANAGER' && position.name.toLocaleUpperCase() != 'ATTENDAT') {
                res.status(400).send({ error: 'Usuário não autorizado!' });
            }

            else {
                next();
            }
        } catch (error) {
            console.error(AppError);
            res.status(500).send({ error: 'Erro interno do servidor' });
            next(error);
        }


    }
}

const authorizationByAttendantMiddleware = new AuthorizationByAttendantMiddleware();

export { authorizationByAttendantMiddleware }