import prisma from "@/lib/prisma.js";
import { inngest } from "./client.js";

//inngest function tosave user data to database

export const syncUserCreation = inngest.createFunction(
  { id: "Sync User Creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event.data;
    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        image: data.image_url,
      },
    });
  },
);

//inngest function to update user data in database

export const syncUserUpdation = inngest.createFunction(
  {
    id: "Sync User Updation",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { data } = event.data;
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        image: data.image_url,
      },
    });
  },
);

//inngest function to delete user data from database

export const syncUserDeletion = inngest.createFunction(
  {
    id: "Sync User Deletion",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { data } = event.data;
    await prisma.user.delete({
      where: {
        id: data.id,
      },
    });
  },
);
