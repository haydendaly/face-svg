import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../../lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { gameId, userId } = req.query;

    if (typeof gameId !== "string" || typeof userId !== "string") {
      throw new Error("Invalid request parameters");
    }

    const user = parseInt(userId, 10);

    const gameRef = firestore.collection("games").doc(gameId);

    await firestore.runTransaction(async (transaction) => {
      const gameDoc = await transaction.get(gameRef);

      if (!gameDoc.exists) {
        const initialData = {
          points_0: user === 0 ? 1 : 0,
          points_1: user === 1 ? 1 : 0,
        };

        transaction.set(gameRef, initialData);
      } else {
        const userData = gameDoc.data();

        const userPointsKey = `points_${user}`;
        const oldData =
          userData?.[userPointsKey] && userData?.[userPointsKey] !== "NaN"
            ? userData[userPointsKey]
            : 0;
        const newPoints = oldData + 1;

        transaction.update(gameRef, { [userPointsKey]: newPoints });
      }
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
