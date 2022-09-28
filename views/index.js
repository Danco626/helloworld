module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Corporate Portal</title>
   <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="UTF-8">    
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <link rel='stylesheet' href='/stylesheets/style.css' />
  <style>
    
  </style>
</head>
<body>
  
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
      <a class="navbar-brand" href="/">Portal</a>
      <ul class="navbar-nav mr-auto">      
          <li class="nav-item">
            <% if (locals.user) { %>
              <a class="nav-link" href="/logout">Logout</a>
          </li>        
          <% } else { %>
            <a class="nav-link" href="/login">Login</a>
          <% } %>
      </ul>
      </div>
    </nav>
  </header>

  <div class="container">

<% if (user) { %>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Claim</th>
        <th scope="col">Value</th>                    
      </tr>
    <tbody>
 <% for( const [key, val] of Object.entries(user)) { %>
  <tr>
    <td><%= key %></td>
    <td><%= val %></td>
  </tr>
  <% } %>
</tbody>
</table>
  <!-- <div class="row justify-content-center">
    <div class="col-4">
    
    </div>
    <div class="col-2">

    </div>
    <div class="col-4">
    
    </div>
  </div> -->

<% } %>

</div>
</body>
</html>`;