import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import SEO from "@/next-seo.config";
import { DefaultSeo } from "next-seo";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import router from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { LayoutContextProvider } from "@/contexts/LayoutContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    const handleRouteStart = () => nprogress.start();
    const handleRouteDone = () => nprogress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />
      <SessionProvider session={session}>
        <Toaster position="top-right" reverseOrder={false} />
        <LayoutContextProvider>
          <Component {...pageProps} />
        </LayoutContextProvider>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
