import dbConnect from '@/libs/dbConnect';
import Users from '@/models/User';

export default async function handler(req: any, res: any) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    try {
      await Users.findOne({
        displayName: req.body.user,
      }).then(async (userByDisplayName) => {
        if (!userByDisplayName) {
          await Users.findById(req.body.user).then((userById) => {
            res.status(200).json({ userInfo: { id: userById._id, displayName: userById.displayName, image: userById.image } });
          });
        } else {
          res.status(200).json({ userInfo: { id: userByDisplayName._id, displayName: userByDisplayName.displayName, image: userByDisplayName.image } });
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}
