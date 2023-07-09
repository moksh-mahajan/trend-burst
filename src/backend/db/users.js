import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "A web developer",
    portfolioUrl: "https://adarshbalika123.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: "shubhamsoni123",
    bio: "A Web developer",
    portfolioUrl: "https://shubham-soni.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Moksh",
    lastName: "Mahajan",
    username: "mokshmahajan",
    password: "mokshmahajan123",
    bio: "A Mobile developer",
    portfolioUrl: "https://moksh-mahajan.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
