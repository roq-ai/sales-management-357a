import { getServerSession } from '@roq/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { authorizationClient } from 'server/roq/roq-client';
import { convertMethodToOperation, convertRouteToEntityUtil, HttpMethod } from 'server/utils';

export function authorizationValidationMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<any>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = getServerSession(req);
    const [mainPath] = req.url.split('?');
    const entity = convertRouteToEntityUtil(mainPath.split('/').pop());
    if (!session) {
      const isPublic = await authorizationClient.isEntityPublic(entity);
      if (!isPublic) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      return handler(req, res);
    }
    const { roqUserId, user } = session;
    const { allowed } = await authorizationClient.hasAccess(
      entity,
      {
        roqUserId,
        roles: user.roles,
        tenantId: user.tenantId,
      },
      convertMethodToOperation(req.method as HttpMethod),
    );
    if (!allowed) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await handler(req, res);
  };
}
