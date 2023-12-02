import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from './constant';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl:baseUrl }),
  tagTypes:['User'],
  endpoints: (builder) => ({
    
    userLogin: builder.mutation({
      query: (query) => ({
        url:'/userLogin',
        method:"POST",
        body:query,
      }),
    }),

    userRegister: builder.mutation({
      query: (query) => ({
        url:'/userRegister',
        method:"POST",
        body:query,
      }),
    }),
   
  }),
})


export const { useUserLoginMutation,useUserRegisterMutation, }=authApi;