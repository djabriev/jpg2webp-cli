import { Request, Response } from 'express';
import { supabase } from '../supabase';
import { CustomError } from '../../../utils';

const loginController = async (req: Request, res: Response) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  if (error) {
    throw new CustomError(error.message);
  }

  const { access_token, refresh_token, expires_at } = data.session!;

  return res.json({ access_token, refresh_token, expires_at });
};

export { loginController };
