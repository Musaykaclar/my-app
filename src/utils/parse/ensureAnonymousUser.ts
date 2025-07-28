import Parse from "parse";

export async function ensureAnonymousUser() {
  if (!Parse.User.current()) {
    try {
      await Parse.AnonymousUtils.logIn();
      console.log("Anonim kullanıcı oluşturuldu:", Parse.User.current()?.id);
    } catch (error) {
      console.error("Anonim kullanıcı oluşturulamadı:", error);
    }
  } else {
    console.log("Kullanıcı zaten mevcut:", Parse.User.current()?.id);
  }
}
