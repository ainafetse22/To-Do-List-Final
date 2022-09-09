<template>
    <div class="field">
      <h1>Log In</h1>
      <!-- <div class="ui left icon input big">
        <i class="user icon"></i>
        <input type="text" placeholder="Full Name" autocomplete="off" />
      </div> -->
      <form class="sign-form">
        <label for="email">
          <input type="email" id="email" name="email" required  />
          email</label
        >
        <label for="password">
          <input type="password" id="password" required name="password" />
          Password</label
        >
        <!-- <button @click="callSignUp">SignUp</button> -->
      </form>
    </div>
</template>

<script setup>

</script>

<style>
.sign-form{
  display: flex;
  flex-direction: column;
}
</style>
