import { Order } from "../models/OrderModel.js";
import { storeSchema, updateSchema } from "../libs/joi/OrderSchema.js";

export async function index(req, res, next) {
  try {
    const { role } = req.auth;
    const { query } = req;
    const mods = {
      include: [
        "status",
        {
          association: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    };

    query.status && (mods.where = { status_id: query.status });
    role.id === 2 && (mods.where = { client_id: req.auth.id });

    const orden_detail = await Order.findAll(mods);

    res.json(orden_detail);
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const { role } = req.auth;
    const order = await Order.findByPk(req.params.id, {
      include: [
        "status",
        {
          association: "user",
          attributes: { exclude: ["password"] },
        },
        {
          association: "order_details",
          include: ["product"],
        },
      ],
    });

    if (!order || (role.id === 2 && order.client_id !== req.auth.id)) {
      throw { message: "Order not found", status: 404 };
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
}

export async function store(req, res, next) {
  try {
    const { body } = req;
    await storeSchema.validateAsync(body);
    await Order.create({
      ...body,
      order_details: JSON.stringify(body.order_details),
      client_id: req.auth.id,
    });
    res.json({ message: "Order created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    await updateSchema.validateAsync(req.body);
    await Order.update({
      ...req.body,
      order_id: req.params.id,
    });
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { role } = req.auth;
    const orden_detail = await Order.find(req.params.id);
    if (!orden_detail || (role.id === 2 && orden_detail.client_id !== req.auth.id)) {
      throw { message: "Orden Detail not found", status: 404 };
    }
    await Order.remove(1, req.params.id);
    res.json({ message: "Orden Detail removed successfully" });
  } catch (error) {
    next(error);
  }
}

export default { index, show, store, update, remove };
