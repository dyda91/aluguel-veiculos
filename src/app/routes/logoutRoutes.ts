import { Router, Request, Response } from 'express';
import path from 'path';

const logoutRoutes = Router();

//Get
logoutRoutes.get('/logout/customer', (req: Request, res: Response) => {
    res.clearCookie('token');
    res.redirect('/login/customer')
});

logoutRoutes.get('/logout/employee', (req: Request, res: Response) => {
    res.clearCookie('token');
    const caminho = path.resolve(__dirname, '..', 'views', 'loginEmployee.ejs');
    res.render(caminho);
});

export { logoutRoutes }