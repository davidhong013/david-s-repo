from flask import Blueprint,render_template,request,flash,redirect,url_for
from .models import User
from . import db
from werkzeug.security import generate_password_hash,check_password_hash
from flask_login import login_user,login_required,logout_user,current_user

auth = Blueprint("auth", __name__)

@auth.route('/login',methods=["GET","POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")

        user = User.query.filter_by(email = email).first()
        if user:
            if check_password_hash(user.password,password):
                login_user(user,remember=True)
                flash("Logged in successfully, rediecting you to the home page", category="succeeded")
                return redirect(url_for('views.home'))
            else:
                flash("Incorrect password", category="failed")
        else:
            flash("the email does not exist", category="failed")



    return render_template("login.html",user = current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for("auth.login"))

@auth.route('/signup',methods=["GET","POST"])
def signup():
    if request.method == "POST":
        currentemail = request.form.get("email")
        currentfirstName = request.form.get("firstName")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")

        user = User.query.filter_by(email = currentemail).first()

        if user:
            flash("the user already exists", category="failed")
        elif len(currentemail) < 4:
            flash("Your email is way too short.", category="failed")
        elif len(currentfirstName) < 2:
            flash("Your firstname is way too short.", category="failed")
        elif password1 != password2:
            flash("passwords don\'t match", category="failed")
        else:
            #add user to the database
            new_user = User(email = currentemail,firstName = currentfirstName,password = generate_password_hash(password1,method = "scrypt"))
            db.session.add(new_user)
            db.session.commit()
            login_user(user,remember=True)
            flash("Account created!",category="succeeded")

            return redirect(url_for('views.home'))

    return render_template("signup.html",user = current_user)