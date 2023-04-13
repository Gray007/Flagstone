// import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Parcel } from "@acme/db";

const TrackingPage = () => {
  // const { user, isSignedIn } = useUser();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingArray, setTrackingArray] = useState<Array<Parcel>>([]);

  const {
    // data: parcelData,
    // isLoading: parcelLoading,
    refetch,
  } = trpc.parcel.getById.useQuery(trackingNumber, {
    enabled: false,
    onSuccess: (data: Parcel) => {
      setTrackingNumber("");
      setTrackingArray([data]);
    },
  });

  // console.log(parcelData);
  // if (!parcelLoading) return <p> Loading... </p>;

  // if (!parcelData) return <p> No data... </p>;

  // const { data: test } = trpc.parcel.getAllByClientId.useQuery(user.id, {
  //   enabled: !!isSignedIn,
  // });

  return (
    <main className="flex h-screen flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Track your parcel here
          </h1>
          <div className="mx-auto max-w-xl rounded-md bg-black bg-opacity-20 p-4">
            <label className="mb-4 block text-sm font-medium text-white">
              Tracking Number (clge9umqh0000tzg81msb89qf):
              <input
                type="text"
                name="clientId"
                placeholder="e.g. clge9umqh0000tzg81msb89qf, clge9wkiq0002tzg87spnxvve..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </label>
            <button
              type="submit"
              onClick={() => refetch()}
              disabled={!trackingNumber}
              className={`mx-auto mt-4 flex justify-center rounded-md bg-orange-500 bg-opacity-20 px-4 py-2 text-sm font-medium ${
                !trackingNumber ? "disabled" : "hover:bg-orange-600"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              Submit
            </button>
          </div>
          <div className="flex justify-center">
            <div className="mx-auto w-full max-w-screen-xl px-4">
              <table className="w-full overflow-hidden rounded-md bg-black bg-opacity-20 shadow-md">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-white">
                      Tracking Number
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-white">
                      Origin
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-white">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left font-bold text-white">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black bg-opacity-10">
                  {trackingArray.length > 0 &&
                    trackingArray.map((parcel: Parcel) => (
                      <tr key={parcel.id} className="border-b border-gray-600">
                        <td className="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-white">
                          {parcel.id}
                        </td>
                        <td className="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-white">
                          {parcel.shippedFrom}
                        </td>
                        <td className="whitespace-no-wrap px-6 py-4 text-sm leading-5 text-white">
                          {parcel.shippedTo}
                        </td>
                        <td className="whitespace-no-wrap px-6 py-4 text-sm leading-5">
                          <span
                            className={`rounded-full px-2 py-1 text-sm font-semibold ${
                              parcel.status === "Delivered"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {parcel.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* <h1 className="text-center text-2xl text-white">
            <Link href="/tracking">Want to track your parcel. Click here!</Link>
          </h1> */}
        </div>
      </div>
    </main>
  );
};

export default TrackingPage;
