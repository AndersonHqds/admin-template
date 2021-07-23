import Image from "next/image";
import Link from "next/link";
import useAuth from "../../data/hook/useAuth";

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth();
  return (
    <Link href="/profile">
      <div className={`rounded-full cursor-pointer ${props.className}`}>
        <Image
          src={user?.imageUrl ?? "/images/avatar.svg"}
          alt="Avatar do usuário"
          height={40}
          width={40}
          className={`rounded-full cursor-pointer`}
        />
      </div>
    </Link>
  );
}
