const Login = () => {
    const REST_API_KEY = 'f3b5a9de3a9e3f774c76a143ca6cb87a';
    const REDIRECT_URI = 'http://localhost:3000/logincallback';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      <div onClick={loginHandler}>
         <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
            alt="카카오 로그인 버튼" />
      </div>
    );
  };

export default Login;