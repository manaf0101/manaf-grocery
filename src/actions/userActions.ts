import axios from "axios";
import { redirect } from "react-router-dom";

export async function saveUsernameAction({ params, request }: any) {
  const formData = await request.formData();
  const userName = formData.get("userName") as string;
  const userId = params.userId;

  if (!userName || userName.length < 4) {
    return { error: "نام کاربری باید حداقل 4 کاراکتر باشد." };
  }

  try {
    await axios.post("http://localhost:8000/api/add-users", {
      userName: userName,
      userId: userId,
    });
    return redirect(`/TheUserPage/${userId}/main`);
  } catch (error) {
    return { error: "خطا در ذخیره نام کاربری." };
  }
}