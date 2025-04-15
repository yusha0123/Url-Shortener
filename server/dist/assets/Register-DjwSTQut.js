import{ag as c,a6 as m,a1 as x,a7 as g,r as p,a9 as f,j as e,ah as h,ab as j,ai as b,K as l,ao as y,aj as v,ak as N,al as w,am as A,O as _,an as M}from"./index-juVjt2tq.js";import{j as E,A as I,c as P}from"./index-hw0QH9x0.js";import{a as S,b as k,c as L}from"./chunk-MW56SEHC-BJzOqHZg.js";const q=()=>{const{login:n}=c();return m({mutationFn:a=>g.post("/api/auth/register",a),onSuccess:({data:{token:a}})=>{x.success("Registration Successful!");const{email:r,username:i}=E(a);n(a,r,i)}})},V=()=>{const[n,a]=p.useState(!1),{register:r,handleSubmit:i,formState:{errors:t}}=f({defaultValues:{username:"",email:"",password:""}}),s=q(),d=()=>a(o=>!o),u=async o=>{s.mutate(o)};return e.jsx("section",{className:"bg-gradient-1 h-[100dvh] flex items-center justify-center",children:e.jsxs(S,{className:"md:w-[30%]",children:[e.jsx(k,{className:"flex justify-center",children:e.jsx(h,{})}),e.jsx(j,{}),e.jsxs(L,{className:"w-full",children:[e.jsx("p",{className:"text-2xl tracking-tight font-bold text-gray-900 text-center",children:"Create your account"}),s.isError&&e.jsx(I,{message:b(s.error)?s.error.response?.data?.message||s.error.message||"Network error occurred":s.error instanceof Error?s.error.message:"An unexpected error occurred during signUp.",type:"error"}),e.jsxs("form",{className:"flex flex-col gap-y-4",onSubmit:i(u),children:[e.jsx(l,{type:"text",label:"Username",radius:"sm",labelPlacement:"outside",startContent:e.jsx(y,{className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"}),...r("username",{required:"Username is required",minLength:{value:5,message:"Username must be at least 5 characters long"},maxLength:{value:20,message:"Username must be less than 20 characters long"}}),isInvalid:!!t?.username,errorMessage:t?.username?.message}),e.jsx(l,{type:"email",label:"Email",radius:"sm",labelPlacement:"outside",startContent:e.jsx(v,{className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"}),...r("email",{required:"Email Address is required",pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,message:"please enter a valid email address"}}),isInvalid:!!t?.email,errorMessage:t?.email?.message}),e.jsx(l,{label:"Password",radius:"sm",labelPlacement:"outside",startContent:e.jsx(A,{className:"text-2xl text-default-400 pointer-events-none flex-shrink-0"}),endContent:e.jsx("button",{className:"focus:outline-none",type:"button",onClick:d,"aria-label":"toggle password visibility",children:n?e.jsx(N,{className:"text-2xl text-default-400 pointer-events-none"}):e.jsx(w,{className:"text-2xl text-default-400 pointer-events-none"})}),type:n?"text":"password",...r("password",{required:"Password is required",minLength:{value:8,message:"Password must be at least 8 characters"},pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,message:"Please choose a stronger password"}}),isInvalid:!!t?.password,errorMessage:t?.password?.message}),e.jsx(_,{color:"primary",radius:"sm",className:"mt-2",type:"submit",isLoading:s.isPending,children:"Register"})]})]}),e.jsxs(P,{className:"flex gap-2 justify-center text-sm px-2 text-gray-500 pt-2 pb-4",children:[e.jsx("p",{children:"Already have an account?"}),e.jsx(M,{className:"underline hover:text-blue-500 transition duration-300 ease-in-out",to:"/login",children:"Login now"})]})]})})};export{V as default};
