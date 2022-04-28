import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';
import decode from 'jwt-decode';
import { validateUserPermissions } from './validateUserPermissions';

type withSSRAuthOptios = {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: withSSRAuthOptios) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    if (options) {

      const user = decode<{ permissions: string[], roles: string[] }>(token);
      const { permissions, roles } = options

      const userHasValidePermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })
      console.log(user);

      if (!userHasValidePermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {

      if (err instanceof AuthTokenError) {

        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');
        console.log(err instanceof AuthTokenError);

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}