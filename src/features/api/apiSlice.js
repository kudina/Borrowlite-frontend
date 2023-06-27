import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://creepy-pear-bear.cyclic.app
// http://localhost:5000
//console.log(process.env.REACT_APP_LOCAL_URL)
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `https://creepy-pear-bear.cyclic.app`,
    tagTypes: ["CurrentUser", "AllTransaction"],
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${localStorage.getItem("accessToken")}`
      );
    },
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload) => ({
        url: "/users/api/v2/signup",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/users/api/v2/login",
        method: "POST",
        body: payload,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/users/api/v2/currentuser",
      }),
      providesTags: ["CurrentUser"],
    }),

    sendOtp: builder.mutation({
      query: (payload) => ({
        url: "/users/api/v2/sendOtp",
        method: "POST",
        body: payload,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: "/users/api/v2/verifyOtp",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/users/api/v2/resetPassword",
        method: "POST",
        body: payload,
      }),
    }),
    updateWallet: builder.mutation({
      query: (payload) => ({
        url: "/users/api/v2/updatebalance",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    verifyMeter: builder.mutation({
      query: (payload) => ({
        url: "/buy/api/v2/verifymeter",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    buyElectricity: builder.mutation({
      query: (payload) => ({
        url: "/buy/api/v2/buyelectricity",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CurrentUser"],
    }),
    checkBuyRef: builder.mutation({
      query: (payload) => ({
        url: "/buy/api/v2/checkbuyref",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),
    saveTransaction: builder.mutation({
      query: (payload) => ({
        url: "/buy/api/v2/savetransaction",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),
    initializePayment: builder.mutation({
      query: (payload) => ({
        url: "/buy/api/v2/initializepayment",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),
    checkPaymentRef: builder.mutation({
      query: (payload) => ({
        url: "/buy/api/v2/checkref",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),
     //Transaction endpoint
    getAllTransactionsByUser: builder.query({
      query: () => ({
        url: "/trx/api/v2/gettransactionbyuser",
      }),
      //invalidatesTags: ["CurrentUser"],
      providesTags: ["AllTransaction"],
    }),
    paybackAmount: builder.mutation({
      query: (payload) => ({
        url: "/trx/api/v2/payback",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),

    getAnalytics: builder.query({
      query: () => ({
        url: "/analytics/api/v2/analytics",
      }),
     // providesTags: ["Ana"],
    }),

    buyairtime: builder.mutation({
      query: (payload) => ({
        url: "/airtime/api/v2/airtime",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),
    airtimestatus: builder.mutation({
      query: (payload) => ({
        url: "/airtime/api/v2/verifystatus",
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: ["CurrentUser"],
    }),


  }),
});

export const {
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useGetCurrentUserQuery,
  useUpdateWalletMutation,
  useVerifyMeterMutation,
  useBuyElectricityMutation,
  useCheckBuyRefMutation,
  useSaveTransactionMutation,
  useInitializePaymentMutation,
  useCheckPaymentRefMutation,
  useSignupMutation,
  useGetAllTransactionsByUserQuery,
  usePaybackAmountMutation,
  useGetAnalyticsQuery,
  useBuyairtimeMutation,
  useAirtimestatusMutation
} = apiSlice;
