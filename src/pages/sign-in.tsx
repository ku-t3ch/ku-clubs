import Band from "@/components/common/Band";
import LayoutNavbar from "@/layouts/WithNavbar";
import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {}

const SignIn: NextPage<Props> = () => {
  const { query } = useRouter();
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-3 py-3">
      <div className="flex flex-col">
        <h1 className="mb-5 text-3xl font-bold">Sign In</h1>
        <button
          className="btn-primary px-5"
          onClick={() => signIn("google", { callbackUrl: query.callbackUrl as string })}
        >
          <Icon icon="akar-icons:google-fill" className="mr-2 text-xl" />
          Sign In with Google (@ku.th)
        </button>
      </div>
    </div>
  );
};

export default SignIn;
