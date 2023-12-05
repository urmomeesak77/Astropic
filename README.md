
<b>Personal Idendification Code </b>

<p>GET [HOST]:3000/pic - full known list of pics</p>
<p>GET [HOST]:3000/pic/[:code] - validate pic and get gender, dob and sequence info:<br />
<pre>
{
    "sex": "M",
    "dob": "1980-02-29",
    "sequence": "222"
}
</pre>
</p>

<p>POST [HOST]:3000/pic/ - create new pic<br />
Body : <br />
<pre>{"dob":"1980-02-29","gender":"M"}</pre>
<br />



</p>