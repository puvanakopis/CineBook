interface LoginFormProps {
    setActiveTab: (tab: "login" | "register" | "forgot") => void;
}

export default function LoginForm({ setActiveTab }: LoginFormProps) {
    return (
        <>
            Login
        </>
    );
}