import { Request, Response } from "express";
import {
  createUserUseCase,
  getUserUseCase,
  loginUserUseCase,
  deactivateUserUseCase,
  verifyEmail,
  getUserInformationUsecase,
  updateUserInformationUsecase
} from "../../usercase/user";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const result = await createUserUseCase.execute(req.body);
      return res.json({
        message: "User created successfully",
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const result = await getUserUseCase.execute();
      return res.status(200).json({
        message: "Users retrieved successfully",
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await loginUserUseCase.execute({ email, password });
      return res.status(200).json({
        token: result.token,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateUserStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await deactivateUserUseCase.execute({ id: Number(id), status });
      return res
        .status(200)
        .json({ message: "User status updated successfully" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async verify(req: Request, res: Response) {
    try {
      const token = req.query.token as string;

      if (!token) {
        return res
          .status(400)
          .send(renderErrorPage("Missing verification token"));
      }

      await verifyEmail.execute(token);

      res.send(renderSuccessPage());
    } catch (error: any) {
      console.error(error);
      res.status(400).send(renderErrorPage(error.message));
    }
  }

  async getUserInformation(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;
      const result = await getUserInformationUsecase.execute(user_id);
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message, success: false });
    }
  }

   async updateUserInformation(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const user_id = user.id;
      const result = await updateUserInformationUsecase.execute(user_id, req.body);
      return res.status(200).json({
        success: true,
        result,
      });
    } catch (err: any) {
      return res.status(400).json({ error: err.message, success: false });
    }
  }
}

// Helper function for success page
function renderSuccessPage(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verified</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 500px;
          width: 100%;
          padding: 48px 40px;
          text-align: center;
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: scaleIn 0.5s ease-out 0.2s both;
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .checkmark {
          width: 40px;
          height: 40px;
          border: 4px solid white;
          border-radius: 50%;
          position: relative;
        }
        .checkmark:after {
          content: '';
          position: absolute;
          left: 10px;
          top: 4px;
          width: 10px;
          height: 18px;
          border: solid white;
          border-width: 0 4px 4px 0;
          transform: rotate(45deg);
        }
        h1 {
          color: #1f2937;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        p {
          color: #6b7280;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
        }
        .btn:active {
          transform: translateY(0);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">
          <div class="checkmark"></div>
        </div>
        <h1>Email Verified!</h1>
        <p>Your email has been successfully verified. You can now access all features of your account.</p>
        
      </div>
    </body>
    </html>
  `;
}

// Helper function for error page
function renderErrorPage(message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Failed</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 500px;
          width: 100%;
          padding: 48px 40px;
          text-align: center;
          animation: slideUp 0.5s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: scaleIn 0.5s ease-out 0.2s both;
        }
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .cross {
          width: 40px;
          height: 40px;
          position: relative;
        }
        .cross:before, .cross:after {
          content: '';
          position: absolute;
          width: 4px;
          height: 40px;
          background: white;
          left: 18px;
        }
        .cross:before { transform: rotate(45deg); }
        .cross:after { transform: rotate(-45deg); }
        h1 {
          color: #1f2937;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        p {
          color: #6b7280;
          font-size: 16px;
          line-height: 1.
          margin-bottom: 32px;
        }
        .error-msg {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
        }
        .btn {
          display: inline-block;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          text-decoration: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 6px rgba(245, 87, 108, 0.3);
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(245, 87, 108, 0.4);
        }
        .btn:active {
          transform: translateY(0);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="icon">
          <div class="cross"></div>
        </div>
        <h1>Verification Failed</h1>
        <p>We couldn't verify your email address. This could be because the link has expired or is invalid.</p>
        <div class="error-msg">${message}</div>
       
      </div>
    </body>
    </html>
  `;
}

export default new UserController();
