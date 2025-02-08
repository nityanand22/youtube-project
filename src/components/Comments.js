import React from "react";

const comData = [
  {
    name: "Nityanand",
    text: "lorem ipsum",
    replies: [],
  },
  {
    name: "Nityanand",
    text: "lorem ipsum",
    replies: [
      {
        name: "Nityanand",
        text: "lorem ipsum",
        replies: [
          {
            name: "Nityanand",
            text: "lorem ipsum",
            replies: [],
          },
          {
            name: "Nityanand",
            text: "lorem ipsum",
            replies: [
              {
                name: "Nityanand",
                text: "lorem ipsum",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Nityanand",
    text: "lorem ipsum",
    replies: [
      {
        name: "Nityanand",
        text: "lorem ipsum",
        replies: [],
      },
    ],
  },
  {
    name: "Nityanand",
    text: "lorem ipsum",
    replies: [],
  },
];

const CommentsData = ({ data }) => {
  const { name, text, replies } = data;

  return (
    <div className="flex bg-gray-300 rounded-lg p-2 my-2">
      <img
        className="w-12 h-12"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"
        alt="user"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <CommentsData data={comment} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));
};

const Comments = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments :</h1>
      <CommentsList comments={comData} />
    </div>
  );
};

export default Comments;
