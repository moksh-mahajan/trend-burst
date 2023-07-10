import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    firstName: "Adarsh",
    lastName: "Balika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shubhamsoni",
    firstName: "Shubham",
    lastName: "Soni",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo elit mi, ut placerat felis finibus non. Nulla facilisi. Integer ut maximus ligula. In hac habitasse platea dictumst. Proin euismod iaculis lacus, nec molestie nisl lobortis a. Nullam tristique vestibulum purus sed viverra. Fusce euismod nibh vitae purus lobortis tempus.",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johnsmith",
    firstName: "John",
    lastName: "Smith",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "uuid()",
    content:
      "Duis gravida mauris id magna egestas, ut semper dui malesuada. Aenean tincidunt lobortis tincidunt. Aliquam id rutrum dui. Nullam condimentum consectetur ante, sit amet vulputate lectus accumsan in. Phasellus euismod nisi nulla, nec varius turpis venenatis in. Nam dapibus mi id est vestibulum interdum. Maecenas viverra urna turpis, id malesuada lectus blandit sit amet. Donec eu risus vel turpis malesuada tristique. Pellentesque accumsan pharetra lectus, id venenatis lacus aliquam sit amet.",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Praesent eget consequat neque. Curabitur vitae ullamcorper tortor. Maecenas in ligula id mauris hendrerit tempor. Donec vitae tempor nulla. Vestibulum pretium sapien augue, vitae commodo elit fermentum in. Nullam dictum, erat et aliquet commodo, nunc risus fermentum felis, non gravida metus risus nec mauris. Sed tincidunt mi at feugiat bibendum. Suspendisse auctor ante id tortor faucibus, vitae tincidunt urna auctor.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "alexjones",
    firstName: "Alex",
    lastName: "Jones",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
