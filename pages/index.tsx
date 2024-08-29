import React, { useState, useEffect, useMemo, Fragment } from "react";

import Head from "next/head";

import { Typography } from "@mui/material";

import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import useProducts from "@/hooks/useProducts";
import Main from '@/components/zeytin/utils/main'

import { useTranslation } from "@/context/useTranslation";

import Link from "next/link";

interface Book {
  _id: string | number;
  title: string;
  story?: string;
  price: string | number;
  cover: string;
  author?: string;
  category?: string;
  forsell?: boolean;
}

const SearchTimeOut = 2000; // 0 ms

const AnimatedTypography = styled(Typography)`
  color: #29221f !important;
  animation: bounce 2s;
  animation-iteration-count: 2;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0);
    }
  }

  &:hover {
    animation: none;
  }
`;

export default function Home() {
  const isPreview = process.env.NEXT_PUBLIC_ISPREVIEW === "true";

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //const [books, setBooks] = useState<Book[]>();
  const [category, setCategory] = useState<string>("");
  //const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  // const [fetch, setFetch] = useState<boolean>(false);
  const [localUser, setLocalUser] = useState<any>();

  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const APIkey = "b7c581feafe045c48764885e9e4a0add";
  const countrystorage = localStorage.getItem("country");

  const handleUpdate = (event: any) => {
    localStorage.setItem("country", country);
  };

  useEffect(() => {
    if (!countrystorage) {
      setOpen(true);
    }
  }, []);

  const { translation } = useTranslation();

  const t = useMemo(() => translation ?? {}, [translation]);

  // ----------

  const { data, isLoading, error } = useProducts({ page, category, search });




 

  const router = useRouter();

  useEffect(() => {
    let localUserFromStorage = localStorage.getItem("user");
    localUserFromStorage
      ? (localUserFromStorage = JSON.parse(localUserFromStorage))
      : (localUserFromStorage = null);
    setLocalUser(localUserFromStorage);
  }, [data]);

  if (error) return <div>failed to load</div>;


  return (
    <>
      <Head>
        <title>Outlet Turkey</title>

        <meta name="description" content="Outlet Turkey" />
        <meta name="keywords" content="Outlet Turkey" />

        <link rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/test-2221c.appspot.com/o/logo-2.jfif?alt=media&token=8b51a5e3-9500-41ae-806e-10db8d17e38e"
        
        sizes="512x512" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logoOutlet.png"
        ></link>
      </Head>

<Main/>




    </>
  );
}
