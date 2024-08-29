// import axios from "axios";
// import dynamic from "next/dynamic";
// import { useState, useEffect } from "react";

// const Column: any = dynamic(
//   () => import("@ant-design/plots").then(({ Column }) => Column),
//   {
//     ssr: false,
//   }
// );

// const DemoColumn = () => {
//   const [users, setUsers] = useState(0);
//   const [admins, setAdmins] = useState(0);
//   useEffect(() => {
//     axios
//       .get("/api/user/handler")
//       .then((res) => {
//         const { data } = res;
//         const { users, admins } = data;
//         setUsers(users);
//         setAdmins(admins);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const data = [
//     {
//       users: "المستخدمين",
//       number: users,
//     },
//     {
//       users: "المشرفين",
//       number: admins,
//     },
//   ];
//   const config = {
//     data,
//     xField: "users",
//     yField: "number",
//     label: {
//       position: "middle",
//       style: {
//         fill: "#dad7ce",
//         opacity: 1,
//       },
//     },
//     columnStyle: {
//       radius: [20, 20, 0, 0],
//     },
//     meta: {
//       users: {
//         alias: "نوع العضوية",
//       },
//       number: {
//         alias: "عدد الأعضاء",
//       },
//     },
//     color: ({ users }: any) => {
//       if (users === "المستخدمين") {
//         return "#c45e4c";
//       }
//       return "#575757";
//     },
//   };
//   return <Column {...config} />;
// };

// export default DemoColumn;

import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { CircularLoading } from "../loading";
const Column: any = dynamic(
  () => import("@ant-design/plots").then(({ Column }) => Column),
  {
    ssr: false,
  }
);

const DemoColumn = () => {
  const url = `/api/user/handler`;

  const { data: Data, isLoading, error, mutate } = useSWR(url, fetcher);

  console.log("USERS && ADMINS-->", Data);

  const data = [
    {
      users: "المستخدمين",
      number: Data?.users,
    },
    {
      users: "المشرفين",
      number: Data?.admins,
    },
  ];
  const config = {
    data,
    xField: "users",
    yField: "number",
    label: {
      position: "middle",
      style: {
        fill: "#dad7ce",
        opacity: 1,
      },
    },
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    meta: {
      users: {
        alias: "نوع العضوية",
      },
      number: {
        alias: "عدد الأعضاء",
      },
    },
    color: ({ users }: any) => {
      if (users === "المستخدمين") {
        return "#c45e4c";
      }
      return "#575757";
    },
  };

  if (isLoading) return <CircularLoading />;

  return <Column {...config} />;
};

export default DemoColumn;



// ----------------

// import axios from "axios";
// import dynamic from "next/dynamic";
// import { useState, useEffect } from "react";

// const Column: any = dynamic(
//   () => import("@ant-design/plots").then(({ Column }) => Column),
//   {
//     ssr: false,
//   }
// );

// const DemoColumn = () => {
//   const [users, setUsers] = useState(0);
//   const [admins, setAdmins] = useState(0);
//   useEffect(() => {
//     axios
//       .get("/api/user/handler")
//       .then((res) => {
//         const { data } = res;
//         const { users, admins } = data;
//         setUsers(users);
//         setAdmins(admins);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const data = [
//     {
//       users: "المستخدمين",
//       number: users,
//     },
//     {
//       users: "المشرفين",
//       number: admins,
//     },
//   ];
//   const config = {
//     data,
//     xField: "users",
//     yField: "number",
//     label: {
//       position: "middle",
//       style: {
//         fill: "#dad7ce",
//         opacity: 1,
//       },
//     },
//     columnStyle: {
//       radius: [20, 20, 0, 0],
//     },
//     meta: {
//       users: {
//         alias: "نوع العضوية",
//       },
//       number: {
//         alias: "عدد الأعضاء",
//       },
//     },
//     color: ({ users }: any) => {
//       if (users === "المستخدمين") {
//         return "#c45e4c";
//       }
//       return "#575757";
//     },
//   };
//   return <Column {...config} />;
// };

// export default DemoColumn;