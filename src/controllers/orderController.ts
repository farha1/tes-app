import { db } from "../database";
import { packageDistribution } from "../services/orderServices";

export const placeOrder = async ({ body }: any) => {
  const { ids } = body;
  const items = await db.products.findMany({
    where: {
      id: { in: ids },
    },
  });

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  if (totalPrice <= 250) return [items];

  const packages = packageDistribution(items);

  const couriers = await db.couriers.findMany();

  // add courier cost properties to packages 
  const response = packages.map((p) => {
    const totalWeight = p.reduce((sum, item) => sum + item.weight, 0);
    const courierCost = couriers.find(
      (c) => totalWeight > c.lower && totalWeight <= c.upper
    )?.cost;

    return {
      courier_cost: courierCost,
      items: p,
    };
  });

  return response;
};
