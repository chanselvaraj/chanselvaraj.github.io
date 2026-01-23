function handleSubmit(e) {
  setTimeout(() => {
    alert("Thanks for reaching out! I’ll get back to you soon.");
    e.target.reset();
  }, 500);
}
