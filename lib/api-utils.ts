import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export class ApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function withAuth<T = any>(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<T>>,
  handler: (req: NextApiRequest, res: NextApiResponse<ApiResponse<T>>, session: any) => Promise<void>,
  requiredRole?: string
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }
    
    if (requiredRole && session.user.role !== requiredRole && session.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Forbidden'
      });
    }
    
    await handler(req, res, session);
  } catch (error) {
    handleApiError(res, error);
  }
}

export function handleApiError<T = any>(
  res: NextApiResponse<ApiResponse<T>>,
  error: unknown
) {
  console.error('API Error:', error);
  
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }
  
  if (error instanceof Error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
  
  return res.status(500).json({
    success: false,
    error: 'Unknown error occurred'
  });
}

export function validateMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedMethods: string[]
): boolean {
  if (!allowedMethods.includes(req.method || '')) {
    res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
    return false;
  }
  return true;
}