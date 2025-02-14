

export class Usuario {

  static fromFirebase( { email, uid, nombre }: { email: string | null; uid: string; nombre: string | null } ): Usuario {
      return new Usuario( uid, nombre, email );
  }


  constructor(
      public uid: string,
      public nombre: string | null,
      public email: string | null
  ){}

}
