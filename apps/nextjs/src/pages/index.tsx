import type { NextPage } from "next";
// import type { inferProcedureOutput } from "@trpc/server";
// import type { AppRouter } from "@acme/api";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { ChangeEvent, useState } from "react";
// import { Tab } from "@headlessui/react";
import { toast, Toaster } from "react-hot-toast";

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// const PostCard: React.FC<{
//   post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
// }> = ({ post }) => {
//   return (
//     <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
//       <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">
//         {post.title}
//       </h2>
//       <p>{post.content}</p>
//     </div>
//   );
// };

// const CreateShipment = () => {
//   const { user } = useUser();
//   return (
//     <div className="max-w-2xl rounded-lg border-2 border-gray-500 p-4 transition-all hover:scale-[101%]">
//       <h2 className="text-2xl font-bold text-[hsl(280,100%,70%)]">Test</h2>
//     </div>
//   );
// };

const Home: NextPage = () => {
  // const postQuery = trpc.post.all.useQuery();

  return (
    <>
      <Head>
        <title>GateStone</title>
        <meta name="description" content="GateStone courier services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#0b0b0c] to-[#31314d] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <div className="container flex flex-col items-center justify-center">
            <Image src={"/logo.png"} alt="Logo" width={320} height={320} />
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Gate<span className="text-[hsl(17,62%,51%)]">STONE</span>
            </h1>
          </div>

          <AuthShowcase />

          {/* <UserInfo /> */}
          {/* <div className="flex h-[60vh] justify-center overflow-y-scroll px-4 text-2xl">
            {postQuery.data ? (
              <div className="flex flex-col gap-4">
                {postQuery.data?.map((p) => {
                  return <PostCard key={p.id} post={p} />;
                })}
              </div>
            ) : (
              <p>Loading..</p>
            )}
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  // const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
  //   undefined,
  //   { enabled: !!isSignedIn },
  // );

  const { data: isAdmin } = trpc.auth.getAdmin.useQuery(undefined, {
    enabled: !!isSignedIn,
  });

  // const { data: parcels } = trpc.parcel.getAll.useQuery(undefined, {
  //   enabled: !!isSignedIn && !!isAdmin,
  // });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn ? (
        <div className="flex items-center justify-center gap-4">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "5rem",
                  height: "5rem",
                },
              },
            }}
            // defaultOpen={true}
          />
        </div>
      ) : (
        <p className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}

      <div className="flex flex-row items-center justify-center gap-2">
        <p className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <Link href="/tracking">Parcel Tracking</Link>
        </p>
      </div>
      {!!isAdmin && !!isSignedIn && (
        <Form    />
      )}
      <Toaster position="top-center" reverseOrder={true} />
      {/* <Tabs /> */}

      {/* 
      {!isSignedIn && (
        <p className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
      <p className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <Link href="/tracking">Tracking</Link>
      </p>
      {isSignedIn && (
        <>
          <div className="fixed inset-0 flex items-center justify-center gap-3">
            <p className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <Link href="/sign-in">Hello</Link>
            </p>
          </div>
          <p className="text-center text-2xl text-white">
            {secretMessage && (
              <span>
                {" "}
                {secretMessage} click the user button!
                <br />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "5rem",
                    height: "5rem",
                  },
                },
              }}
              defaultOpen={true}
            />
          </div>
        </>
      )} */}
    </div>
  );
};

const Form: React.FC = () => {
  const { isLoaded: userLoaded, user } = useUser();

  // const [clientIdInput, setClientIdInput] = useState("");
  const [branchToInput, setBranchToInput] = useState("");
  const [branchFromInput, setBranchFromInput] = useState("");

  const { data: branches, isLoading: branchesLoading } =
    trpc.branch.getAll.useQuery();

  const { mutate, isLoading: creatingDelivery } =
    trpc.parcel.create.useMutation({
      onSuccess: (parcel) => {
        setBranchToInput("");
        setBranchFromInput("");
        runTrackingToast(parcel.id);
      },
      // onError: (e) => {
      // },
    });

    if (!!branchesLoading || !userLoaded) return <p> Loading... </p>;

    if (!branches || !user) return <p> No data... </p>;

  const handleBranchToChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBranchToInput(value);
    if (value === branchFromInput) {
      setBranchFromInput("");
    }
  };

  const handleBranchFromChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setBranchFromInput(value);
    if (value === branchToInput) {
      setBranchToInput("");
    }
  };

  const runTrackingToast = (tracking: string) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } pointer-events-auto mt-1 flex w-full max-w-md rounded-lg bg-zinc-800 px-2 py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75`}
      >
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">Tracking Number</p>
              <p className="mt-1 text-sm text-gray-400">{tracking}</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              navigator.clipboard.writeText(tracking);
              toast("Copied!", {
                icon: "👏",
                style: {
                  borderRadius: "8px",
                  background: "#333",
                  color: "#fff",
                },
              });
            }}
            className="flex w-full items-center justify-center rounded-none bg-zinc-800 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
          >
            Copy
          </button>
          <div className="border-l border-gray-200"></div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex w-full items-center justify-center rounded-none bg-zinc-800 px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  const isSubmitDisabled =
    !user['id'] || !branchToInput || !branchFromInput;

  return (
    <div className="mx-auto max-w-md rounded-md bg-black bg-opacity-20 p-4">
      <label className="mb-4 block text-sm font-medium text-white">
        Client ID:
        <input
          type="text"
          name="clientId"
          value={user['id']}
          // onChange={(e) => setClientIdInput(e.target.value)}
          disabled={true}
          className="disabled"
        />
      </label>
      <label className="mb-4 block text-sm font-medium text-white">
        Destination Branch:
        <select
          name="branchTo"
          value={branchToInput}
          onChange={handleBranchToChange}
        >
          <option value="" disabled>
            -- Select Destination Branch --
          </option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mb-4 block text-sm font-medium text-white">
        Your Branch:
        <select
          name="branchFrom"
          value={branchFromInput}
          onChange={handleBranchFromChange}
        >
          <option value="" disabled>
            -- Select Your Branch --
          </option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.name}>
              {branch.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        onClick={() => {
            mutate({
              clientId: user['id'],
              shippedFrom: branchFromInput,
              shippedTo: branchToInput,
            });
        }}
        disabled={isSubmitDisabled || creatingDelivery}
        className={`mx-auto mt-4 flex justify-center rounded-md bg-orange-500 bg-opacity-20 px-4 py-2 text-sm font-medium ${
          isSubmitDisabled ? "disabled" : "hover:bg-orange-600"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        Submit
      </button>
    </div>
  );
};

// const Tabs: React.FC = () => {
//   const [categories] = useState({
//     Recent: [
//       {
//         id: 1,
//         title: "Does drinking coffee make you smarter?",
//         date: "5h ago",
//         commentCount: 5,
//         shareCount: 2,
//       },
//       {
//         id: 2,
//         title: "So you've bought coffee... now what?",
//         date: "2h ago",
//         commentCount: 3,
//         shareCount: 2,
//       },
//     ],
//     Popular: [
//       {
//         id: 1,
//         title: "Is tech making coffee better or worse?",
//         date: "Jan 7",
//         commentCount: 29,
//         shareCount: 16,
//       },
//       {
//         id: 2,
//         title: "The most innovative things happening in coffee",
//         date: "Mar 19",
//         commentCount: 24,
//         shareCount: 12,
//       },
//     ],
//     // Trending: [
//     //   {
//     //     id: 1,
//     //     title: 'Ask Me Anything: 10 answers to your questions about coffee',
//     //     date: '2d ago',
//     //     commentCount: 9,
//     //     shareCount: 5,
//     //   },
//     //   {
//     //     id: 2,
//     //     title: "The worst advice we've ever heard about coffee",
//     //     date: '4d ago',
//     //     commentCount: 1,
//     //     shareCount: 2,
//     //   },
//     // ],
//   });

//   return (
//     <div className="w-full max-w-md px-2 py-16 sm:px-0">
//       <Tab.Group>
//         <Tab.List className="flex w-full space-x-1 rounded-xl bg-blue-900/20 p-1">
//           {Object.keys(categories).map((category) => (
//             <Tab
//               key={category}
//               className={({ selected }) =>
//                 classNames(
//                   "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
//                   "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
//                   selected
//                     ? "bg-white shadow"
//                     : "text-blue-100 hover:bg-white/[0.12] hover:text-white",
//                 )
//               }
//             >
//               {category}
//             </Tab>
//           ))}
//         </Tab.List>
//         <Tab.Panels className="mt-2">
//           {Object.values(categories).map((posts, idx) => (
//             <Tab.Panel
//               key={idx}
//               className={classNames(
//                 "rounded-xl bg-white p-3",
//                 "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
//               )}
//             >
//               <ul>
//                 {posts.map((post) => (
//                   <li
//                     key={post.id}
//                     className="relative rounded-md p-3 hover:bg-gray-100"
//                   >
//                     <h3 className="text-sm font-medium leading-5">
//                       {post.title}
//                     </h3>

//                     <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
//                       <li>{post.date}</li>
//                       <li>&middot;</li>
//                       <li>{post.commentCount} comments</li>
//                       <li>&middot;</li>
//                       <li>{post.shareCount} shares</li>
//                     </ul>

//                     <a
//                       href="#"
//                       className={classNames(
//                         "absolute inset-0 rounded-md",
//                         "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2",
//                       )}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </Tab.Panel>
//           ))}
//         </Tab.Panels>
//       </Tab.Group>
//     </div>
//   );
// };
