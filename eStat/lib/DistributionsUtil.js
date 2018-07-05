var LARGE = 1.7e300;

// N(mu,std) 정규분포 pdf -------------------------------------------------------------------------------------------
function normal_pdf(mu, std, x) {
      /*        
        - pdf of the  normal distribution, N(mu,std)
        pdf = (2*pi)^(-1/2) (std)^(-1) exp( - ((x-mu)/std)^2/2) ),   -inf < z < inf
      input 
        x : value
      output
        normal_pdf :
      */
      	var root2pi;
      	var zabs, pdf;
      	var temp, expntl;
     	var root2pi = Math.sqrt(2*Math.PI);
      	var z = (x-mu) / std;
        var zabs = Math.abs(z);
      	// |z| > 37.
      	if( zabs > 37.0 ) return 0.0;
      	
      	// |z| < 37.
      	temp  = -0.5 * zabs * zabs;
      	expntl = Math.exp(temp);
      	pdf = expntl / (root2pi * std);
      	return pdf;
}

function stdnormal_pdf( z ) {
/*
    - pdf of the standard normal distribution, N(0,1)
	 
	     pdf = (2*pi)^(-1/2) exp( - z^2/2 ),   -inf < z < inf
  input 
      z : no. of standard deviations from the mean.
  output
     stdnormal_pdf :
*/
	var root2pi;
	var zabs, pdf;
	var temp, expntl;
	root2pi = 2.506628274631001;
	zabs = Math.abs(z);
	// |z| > 37.
	if( zabs > 37.0 ) return 0.0;
	
	// |z| < 37.
	temp  = -0.5 * zabs * zabs;
	expntl = Math.exp(temp);
	pdf = expntl / root2pi;
	return pdf;
}

function stdnormal_cdf(z ) {
/*
    - cdf of the standard normal distribution, N(0,1)
	 
	     pdf = (2*pi)^(-1/2) exp( - z^2/2 ),   -inf < z < inf
         cdf = int_-inf^x pdf dz
  input 
      z : no. of standard deviations from the mean.
  output
	 stdnormal_cdf : probability to the left of z
*/
/* Normal distribution probabilities accurate to 1.e-15.
   z = no. of standard deviations from the mean.
   returns probability to the left of z. 
   Based upon algorithm 5666 for the error function, from:
   Hart, J.F. et al, 'Computer Approximations', Wiley 1968
   Translated from Fortran to C by JungHo Ahn & GunSeog Kang 
*/
	var p0, p1, p2, p3, p4, p5, p6;
	var q0, q1, q2, q3, q4, q5, q6, q7;
	var cutoff, root2pi;
	var zabs, prob;
	var temp, expntl, pdf;
	p0 = 220.2068679123761;
	p1 = 221.2135961699311;
	p2 = 112.0792914978709;
	p3 = 33.91286607838300;
	p4 = 6.373962203531650;
	p5 = .7003830644436881;
	p6 = .3526249659989109e-1;
	q0 = 440.4137358247522;
	q1 = 793.8265125199484;
	q2 = 637.3336333788311;
	q3 = 296.5642487796737;
	q4 = 86.78073220294608;
	q5 = 16.06417757920695;
	q6 = 1.755667163182642;
	q7 = .8838834764831844e-1;
	cutoff = 7.071;
	root2pi = 2.506628274631001;
	zabs = Math.abs(z);
	/////////////////////////////////////////////
	// |z| > 37.
	if( zabs > 37.0 )
	{
		pdf = 0.0;
		if( z > 0.0 ) prob = 1.0;
		else          prob = 0.0;
		
		return prob;
	}
	///////////////////////////////////////////
	// |z| < 37.
	temp  = -0.5 * zabs * zabs;
	expntl = Math.exp(temp);
	pdf = expntl / root2pi;
	////////////////////////////////////////
	// |z| < coutoff = 10/sqrt(2).
	if( zabs < cutoff ) 
	{
		prob = expntl * ((((((p6*zabs + p5)*zabs + p4)*zabs + p3)*zabs +
     		p2)*zabs + p1)*zabs + p0) / (((((((q7*zabs + q6)*zabs +
     		q5)*zabs + q4)*zabs + q3)*zabs + q2)*zabs + q1)*zabs + q0);
	}
	else	// |z| >= coutoff.
	{
		prob =  pdf / (zabs + 1.0/(zabs + 2.0/(zabs + 3.0/(zabs + 4.0/
     		(zabs + 0.65)))));
	}
	if( z >= 0.0 ) prob = 1.0 - prob;
	
	return prob;
}

function stdnormal_inv(P, info ) {
/*
    - percentile of the standard normal distribution, N(0,1)
	 
	     pdf = (2*pi)^(-1/2) exp( - z^2/2 ),   -inf < z < inf
         cdf = Phi(x) = xint_-inf^x pdf dz
         inv = Phi^-1(p)
    - Should use only when info=0.
  input 
      P : probability
  output
	 stdnormal_inv : the normal deviate Z corresponding to a given lower tail area of P
         info = 0 : normal return
	             1 : P < 0 or P > 1
*/
/* 
	Produces the normal deviate Z corresponding to a given lower
	tail area of P; Z is accurate to about 1 part in 10**16.
    should use only when info=0.
  
	ALGORITHM AS 241  APPL. STATIST. (1988) VOL. 37, NO. 3
	The hash sums below are the sums of the mantissas of the
	coefficients.  They are included for use in checking
	transcription.
     Translated by G. Kang, Aug. 2000
*/
	var ZERO, ONE, HALF, SPLIT1, SPLIT2, CONST1, CONST2, 
		A0, A1,	A2, A3, A4, A5, A6, A7, B1, B2, B3, B4, B5, B6, B7,
     		C0, C1, C2, C3, C4, C5, C6, C7,	D1, D2, D3, D4, D5, D6, D7, 
		E0, E1, E2, E3, E4, E5, E6, E7, F1, F2, F3, F4, F5, F6, F7, Q, R;
	var dtemp;
	ZERO = 0.0;	ONE = 1.0; HALF = 0.5;
    SPLIT1 = 0.425; SPLIT2 = 5.0; CONST1 = 0.180625; CONST2 = 1.6; 
/*
 	Coefficients for P close to 0.5
*/
	A0 = 3.3871328727963666080;     A1 = 1.3314166789178437745e+2;
    	A2 = 1.9715909503065514427e+3;  A3 = 1.3731693765509461125e+4;
	A4 = 4.5921953931549871457e+4;  A5 = 6.7265770927008700853e+4;
	A6 = 3.3430575583588128105e+4;  A7 = 2.5090809287301226727e+3;
    	B1 = 4.2313330701600911252e+1;  B2 = 6.8718700749205790830e+2;
    	B3 = 5.3941960214247511077e+3;  B4 = 2.1213794301586595867e+4;
    	B5 = 3.9307895800092710610e+4;  B6 = 2.8729085735721942674e+4;
    	B7 = 5.2264952788528545610e+3;
/* HASH SUM AB    55.88319 28806 14901 4439
	Coefficients for P not close to 0, 0.5 or 1.
*/
	C0 = 1.42343711074968357734;     C1 = 4.63033784615654529590;
    	C2 = 5.76949722146069140550;     C3 = 3.64784832476320460504;
    	C4 = 1.27045825245236838258;     C5 = 2.41780725177450611770e-1;
    	C6 = 2.27238449892691845833e-2;  C7 = 7.74545014278341407640e-4;
    	D1 = 2.05319162663775882187;     D2 = 1.67638483018380384940;
    	D3 = 6.89767334985100004550e-1;  D4 = 1.48103976427480074590e-1;
    	D5 = 1.51986665636164571966e-2;  D6 = 5.47593808499534494600e-4;
    	D7 = 1.05075007164441684324e-9;
/*	HASH SUM CD    49.33206 50330 16102 89036
	Coefficients for P near 0 or 1.
*/
	E0 = 6.65790464350110377720;       E1 = 5.46378491116411436990;
    	E2 = 1.78482653991729133580;       E3 = 2.96560571828504891230e-1;
    	E4 = 2.65321895265761230930e-2;    E5 = 1.24266094738807843860e-3;
    	E6 = 2.71155556874348757815e-5;    E7 = 2.01033439929228813265e-7;
    	F1 = 5.99832206555887937690e-1;    F2 = 1.36929880922735805310e-1;
    	F3 = 1.48753612908506148525e-2;    F4 = 7.86869131145613259100e-4;
    	F5 = 1.84631831751005468180e-5;    F6 = 1.42151175831644588870e-7;
   	 F7 = 2.04426310338993978564e-15;
//	HASH SUM EF    47.52583 31754 92896 71629
//
	info = 0;
	Q = P - HALF;
	if (Math.abs(Q) <= SPLIT1) {
	  R = CONST1 - Q * Q;
	  dtemp = Q * (((((((A7 * R + A6) * R + A5) * R + A4) * R + A3)
     			* R + A2) * R + A1) * R + A0) /
     		      (((((((B7 * R + B6) * R + B5) * R + B4) * R + B3)
     			* R + B2) * R + B1) * R + ONE) ;
	  return dtemp; 
	}
	else {
	  if (Q < ZERO) R = P;
	  else R = ONE - P;
	  if (R <= ZERO) {
	    info = 1;
	    dtemp = ZERO;
	    return dtemp; 
	  }
	  R = Math.sqrt(-Math.log(R));
	  if(R <= SPLIT2) {
	    R = R - CONST2;
	    dtemp = (((((((C7 * R + C6) * R + C5) * R + C4) * R + C3)
     			* R + C2) * R + C1) * R + C0) /
     		     (((((((D7 * R + D6) * R + D5) * R + D4) * R + D3)
     			* R + D2) * R + D1) * R + ONE) ;
	  }
	  else {
	    R = R - SPLIT2;
	    dtemp = (((((((E7 * R + E6) * R + E5) * R + E4) * R + E3)
     			* R + E2) * R + E1) * R + E0) /
     		     (((((((F7 * R + F6) * R + F5) * R + F4) * R + F3)
     			* R + F2) * R + F1) * R + ONE) ;
	  }
	  if(Q < ZERO) dtemp = - dtemp; 
	  return dtemp;
	}
}

function t_pdf(x, v, info ) {
/*
    - pdf of a t-distribution with df = v, t(x:v)
	         pdf = ( sqrt(v) * B(v/2, 1/2) )^-1 * (1+x^2/v)^(-(a+1)/2), -inf<x<inf, v>0  
	    - External function required : lnbeta
	  input 
      x : [-inf, inf]
	  v : > 0 
	  output
         t-pdf :
     info = 0 : normal return
             1 : v <= 0 
*/
	var pdf, temp;
		info = 0;
	if( v <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		temp = -(v+1.0)/2.0 * Math.log( 1.0 + x*x/v ) - 0.5 * Math.log(v) - lnbeta(v/2.0, 0.5, info);
    pdf = Math.exp( temp );
		return pdf;
}

function t_cdf(x, v, info ) {
/*
    - cdf of a t-distribution with df = v, t(x:v)
	         pdf = ( sqrt(v) * B(v/2, 1/2) )^-1 * (1+x^2/v)^(-(a+1)/2), -inf<x<inf, v>0  
         cdf = 0.5 * IB( v/(v+x*x); v/2, 0.5 )      if x <= 0
		       1 - 0.5 * IB( v/(v+x*x); v/2, 0.5 )  if x >  0
	    - External function required : lnbeta, incomp_beta
	  input 
      x : [-inf, inf]
	  v : > 0 
	  output
         t-cdf : probability to the left of x 
     info = 0 : normal return
             1 : v <= 0 
*/
	var cdf, temp, temp1, temp2;
		info = 0;
	if( v <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		temp1 = v / ( v + x*x );
	temp2 = lnbeta( v/2.0, 0.5, info );
    temp = incomp_beta( temp1, v/2.0, 0.5, temp2, info );
    cdf = temp / 2.0;
		if( x > 0.0 )
		cdf = 1.0 - cdf;
		return cdf;
}


function lnbeta(a, b, info ) {
/*
    - Compute log of Beta function :  
	   
         B(a,b) = int_0^1 x^a-1 (1-x)^b-1 dx,   a, b > 0
       
	- External function required : lngamma(a, info)
  input 
      a, b : >0
  
  output
        lnbeta : log of B(a,b)
     info = 0 : normal return
            1 : a or b is <= 0
*/
/*   
	Programmed by G. Kang, Aug. 2000
*/
    var temp;
	info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	
	temp = lngamma(a, info) + lngamma(b, info) - lngamma(a+b, info);
	
	return temp;
}

function incomp_beta(x, a, b, beta, info ) {
/*
    - Computes incomplete beta function ratio for arguments x in [0,1]
	         IB(x; a, b) = int_0^x t^a-1 (1-t)^b-1 dt / beta(a,b)
	 
	- log of complete beta function, beta, is assumed to be known
	  input 
      x : [0,1]
	  a : > 0
	  b : > 0
	  output
     incomp_beta : IB(x; a, b), or cdf of a beta distribution (left area of x)
       info = 0 : normal return
               1 : a <= 0 or b <= 0
*/
	/*
     Algorithm AS 63  appl. statist. (1973), vol.22, no.3
*/
	//  define accuracy and initialise
	var indx, b4=true;
	var zero, one, acu, inbeta, psq, cx, xx, pp, qq, term, temp=1, ai, rx;
        var ns;
	zero = 0.0; one = 1.0; 
	acu = 1.0e-26;  // 1.0e-14 in orignal paper;  -26 = -2(12)-2 
	inbeta = x;
	//  test for admissibility of arguments
		info=1;
	if( a<=zero || b<=zero ) return inbeta;
		info = 0;
	if( x <= zero ) return zero;
	if( x >= one  ) return one;
	//  change tail if necessary and determine s
		psq = a + b;
	cx = one - x;
	
	if( a >= psq*x ) 
	{
		xx = x;
		pp = a;
		qq = b;
		indx = false;
	}
	else
	{
		xx = cx;
		cx = x;
		pp = b;
		qq = a;
		indx = true;
	}
	term = one;
	ai = one;
	inbeta = one;
	ns = Math.floor(qq + cx*psq);
	//  user soper's reduction formulae.
		rx = xx / cx;
	do
	{
		if(b4 == true)
		{
			temp = qq - ai;
			if(ns == 0) rx = xx;
		}
		term = term * temp * rx / (pp+ai);
		inbeta = inbeta + term;
		temp = Math.abs(term);
		
		if( temp<=acu && temp<=acu*inbeta ) 
			break;
		
		ai = ai + one;
		ns = ns - 1;
		
		if( ns >= 0 ) 
		{
			b4 = true;
			continue;
		}
		
		temp = psq;
		psq = psq + one;
			b4 = false;
	}while(true);
	//   calculate result
		inbeta = inbeta * Math.exp( pp*Math.log(xx) + (qq-one)*Math.log(cx) - beta ) / pp;
	
	if(indx) 
		inbeta = one - inbeta;
		return inbeta;
}

function lngamma(z, info ) {
/*
    - Compute log of gamma function for z > 0
         Gamma(z) = int_0^inf x^z-1 e^-x dx ,  z > 0
    - Should use only when info = 0
  input 
      z : > 0
  output
        lngamma : log of Gamma(z)
     info  = 0 : normal return
             1 : z <= 0
*/
/*
       Uses Lanczos-type approximation.
       Reference:
            Lanczos, C. 'A precision approximation of the gamma
                    function', J. SIAM Numer. Anal., B, 1, 86-96, 1964.
			- included in AS 245, but not an AS algorithm
			- slower but more accurate than AS 245
       Accuracy: About 14 significant digits except for small regions
                 in the vicinity of 1 and 2.
       Translated by G. Kang, Aug. 2000 (AS 245)
*/
	var j;
	var lnsqrt2pi, dtemp, tmp;
	var a=[0.0, 0.9999999999995183, 676.5203681218835, -1259.139216722289, 771.3234287757674, -176.6150291498386, 12.50734324009056, -0.1385710331296526, 0.9934937113930748e-5, 0.1659470187408462e-6 ];
	lnsqrt2pi = 0.9189385332046727;
	if (z <= 0.0) {
	  info = 1;
	  return -LARGE;
	}
	info = 0;
	dtemp = 0.0;
	tmp = z + 7.0;
	for(j=9; j>=2; j--) {
	  dtemp = dtemp + a[j] / tmp;
	  tmp = tmp - 1.0;
	}
	dtemp = dtemp + a[1];
	dtemp = Math.log(dtemp) + lnsqrt2pi - (z+6.5) + (z-0.5)*Math.log(z+6.5);
	return dtemp;
}

function t_inv(p, v, info ) {
/*
    - percentile of a t-distribution with df = v, t(x:v)
	         pdf = ( sqrt(v) * B(v/2, 1/2) )^-1 * (1+x^2/v)^(-(a+1)/2), -inf<x<inf, v>0  
         cdf = 0.5 * IB( v/(v+x*x); v/2, 0.5 )      if x <= 0
		       1 - 0.5 * IB( v/(v+x*x); v/2, 0.5 )  if x >  0
         inv = 
	    - External function required : lnbeta, beta_inv
	  input 
      p : [0, 1]
	  v : > 0 
	  output
         t-inv : percentile 
     info = 0 : normal return
            1 : v <= 0 
*/
	var inv, temp1, temp;
		info = 0;
	if( v <= 0.0 ) {
		info = 1;
		return -LARGE;
	}
		if( p <= 0.0 ) inv = -LARGE;
	else if( p >= 1.0 ) inv = LARGE;
    else if( p < 0.5 )
	{
		temp1 = lnbeta( v/2.0, 0.5, info );
		temp = beta_inv( 2.0*p, v/2.0, 0.5, temp1, info );
		inv = -Math.sqrt( v * (1.0/temp - 1.0) );
	}
	else
	{
		temp1 = lnbeta( v/2.0, 0.5, info );
		temp = beta_inv( 2.0*(1.0-p), v/2.0, 0.5, temp1, info );
		inv = Math.sqrt( v * (1.0/temp - 1.0) );
	}
		return inv;
}

function beta_pdf(x, a, b, info ) {
/*
    - pdf of a beta distribution, beta(x; a, b)
	 
         pdf = x^a-1 * (1-x)^b-1 / B(a,b),  0 <= x <= 1,  a, b > 0
  input 
         x : [0, 1]
      a, b : > 0
  output
      beta_pdf : 
     info = 0 : normal return
             1 : a, b <= 0
*/
	var temp, pdf;
	info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	if( x <= 0.0 || x >= 1.0 ) pdf = 0.0;
	else {
		temp = (a-1.0)*Math.log(x) + (b-1.0)*Math.log(1.0-x) - lnbeta( a, b, info );
		pdf = Math.exp( temp );
	}
	return pdf;
}

function beta_inv(alpha, a, b, beta, info ) {
/*
    - Computes inverse of the incomplete beta function ratio for 
	   given positive values of the arguments a and b, alpha between zero and one.
	    - log of complete beta function, beta, is assumed to be known.
	    - External function required:  incomp_beta
	  input 
      alpha : [0,1]
	      a : > 0
	      b : > 0
	  output
      beta_inv : 
     info = 0 : normal return
             1 : a <= 0.0 or b <= 0.0
             2 : error in incomp_beta(xinbeta, pp, qq, beta, info);
*/
	/*
     Algorithm AS 109 appl. statist. (1977), vol.26, no.1
     (replacing algorithm as 64  appl. statist. (1973),
      vol.22, no.3)
	     Remark AS R83 and the correction in vol40(1) a.236 have been 
     incorporated in this version.
*/
      var indx;
      var iex;
      var pp, qq, r, fpu, acu, sae, zero, one, two, three, four, five, six;
      var d, g, s, t, h, w, y, yprev, sq, xin, tx, adj, prev, xinbeta;
      var temp;
/*
     Define accuracy and initialise.
     SAE below is the most negative decimal exponent which does not 
     cause an underflow; d value of -308 or thereabouts will often be 
     OK in double precision.
*/
      acu = 1.0e-26; // -14;
      sae = -300.0;    //-37.0//
      zero  = 0.0; one  = 1.0; two  = 2.0;
      three = 3.0; four = 4.0; five = 5.0; six = 6.0;
	      fpu = Math.pow(10.0, sae);
      xinbeta = alpha;
	//    test for admissibility of parameters
	      info = 1;
      if ( a <= zero || b <= zero ) return xinbeta;
      
      info = 0;
      if ( alpha <= zero ) return zero;
      if ( alpha >= one  ) return one;
	//  change tail if necessary
	      if ( alpha <= 0.5 ) 
	  {
		  d = alpha;
		  pp = a;
		  qq = b;
		  indx = false;
	  }
      else
	  {
		  d = one - alpha;
		  pp = b;
		  qq = a;
		  indx = true;
	  }
	//     calculate the initial approximation
	      r = Math.sqrt(-Math.log(d*d));
      y = r - (2.30753 + 0.27061*r) / (one + (0.99229 + 0.04481*r)*r);
      
      if( pp>one && qq>one ) 
	  {
		  //goto 5
		  r = (y*y-three)/six;
		  s = one/(pp+pp-one);
		  t = one/(qq+qq-one);
		  h = two/(s+t);
		  w = y*Math.sqrt(h+r)/h-(t-s)*(r+five/six-two/(three*h));
		  xinbeta = pp/(pp+qq*Math.exp(w+w));
      }
      else
	  {
		  r = qq+qq;
		  t = one/(9.0*qq);
		  t = r * Math.pow( (one-t+y*Math.sqrt(t)), 3.0 );
		  
		  if( t<=zero ) 
			  xinbeta = one-Math.exp( ( Math.log((one-d)*qq) + beta ) / qq );
		  else
		  {
			  t = (four*pp+r-two)/t;
			  
			  if( t<=one ) 
				  xinbeta = Math.exp( ( Math.log(d*pp) + beta ) / pp );
			  else
				  xinbeta = one-two/(t+one);
		  }
	  }
	//     solve for x by a modified newton-raphson method,
//     using the function betain
	      r = one - pp;
      t = one - qq;
      yprev = zero;
      sq = one;
      prev = one;
      
      if( xinbeta < 0.0001 ) xinbeta = 0.0001;
	  if( xinbeta > 0.9999 ) xinbeta = 0.9999;
	      temp = -5.0/(pp*pp) - 1.0/Math.pow(d,0.2) - 13.0;
      iex = Math.floor( ( temp >= sae )? temp : sae );
//	  iex = __max(-5.0/(pp*pp) - 1.0/pow(d,0.2) - 13.0, sae);
      acu = Math.pow(10.0 , iex);
	  
	  while(true)
	  {
		  y = incomp_beta(xinbeta, pp, qq, beta, info);
		  if( info != 0 ) 
		  {
			  info = 2;
			  return xinbeta;
		  }
			  xin = xinbeta;
		  y = (y-d) * Math.exp( beta + r*Math.log(xin) + t*Math.log(one-xin) );
		  
		  if( y*yprev <= zero) 
			  prev = ( sq >= fpu )? sq : fpu;
//			  prev = __max(sq, fpu);
		  g = one;
		  
		  while(true)
		  {
			  adj = g * y;
			  sq = adj * adj;
			  
			  if( sq >= prev ) 
			  {
				  g = g / three;
				  continue;
			  }
			  
			  tx = xinbeta - adj;
			  
			  if( tx>=zero && tx<=one ) 
			  {				  
				  if( prev <= acu )  
				  {
					  if (indx) 
						  xinbeta = one - xinbeta;
					  
					  return xinbeta;
				  }
				  
				  if( y*y <= acu ) 
				  {
					  if (indx) 
						  xinbeta = one-xinbeta;
					  
					  return xinbeta;
				  }
				  
				  if( tx==zero || tx==one ) 
				  {
					  g = g / three;
					  continue;
				  }
				  
				  if( tx == xinbeta ) 
				  {
					  if (indx) 
						  xinbeta = one-xinbeta;
					  
					  return xinbeta;
				  }
				  
				  xinbeta = tx;
				  yprev = y;
			  }
			  else
			  {
				  g = g / three;
				  continue;
			  }
			  break;
		  }
	  }
	//      if (indx) 
//		  xinbeta = one - xinbeta;
	//	  return xinbeta;
}

function cauchy_pdf(x, a, b, info ) {
/* 
    - pdf of a Cauchy distribution Cauchy(x; a, b), 
   
         pdf = (pi * b )^-1 ( 1 + ( (x-a)/b )^2 )^-1 
                                   -inf < x < inf, -inf < a < inf, b > 0
  input 
      x : (-inf, inf)
	  a : (-inf, inf)
	  b : > 0
  output
     cauchy_pdf :
     info  = 0 : normal return
              1 : b <= 0
*/
	var pdf;
	info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	pdf = 1.0 + (x-a)/b * (x-a)/b;
	pdf = 1.0 / Math.PI / b / pdf;
	return pdf;
}

function cauchy_cdf(x, a, b, info ) {
/* 
    - cdf of a Cauchy distribution Cauchy(x; a, b), 
   
         pdf = (pi * b )^-1 ( 1 + ( (x-a)/b )**2 )^-1 
         cdf = 0.5 + pi^-1 * arctan( (x-a)/b )
                                -inf < x < inf, -inf < a < inf, b > 0
  input 
      x : (-inf, inf)
	  a : (-inf, inf)
	  b : > 0
  output
     cauchy_cdf : probability to the left of x
     info  = 0 : normal return
              1 : b <= 0
*/
	var cdf;
	info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	cdf = 0.5 + Math.atan( (x-a)/b ) / Math.PI ;
	return cdf;
}

function cauchy_inv(p, a, b, info ) {
/* 
    - percentile of a Cauchy distribution Cauchy(x; a, b), 
   
        pdf = (pi * b )^-1 ( 1 + ( (x-a)/b )**2 )^-1 
        cdf = 0.5 + pi^-1 * arctan( (x-a)/b )
        inv = a + b * tan( pi * (p-0.5) )
                                -inf < x < inf, -inf < a < inf, b > 0
  input 
      p : [0,1]
	  a : (-inf, inf)
	  b : > 0
  output
     cauchy_inv : percentile
     info  = 0 : normal return
              1 : b <= 0
*/
	var inv;
	info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return 0.0;
	}
	if( p <= 0.0 ) inv = -LARGE;
	else if( p >= 1.0 ) inv =  LARGE;
	else inv = a + b * Math.tan( Math.PI * (p-0.5) );
	return inv;
}

function chisq_pdf(x, df, info ) {
/* 
    - pdf of a chi-square distribution with df=df, chi(x; df), 
         pdf = x^(df/2-1) exp(-x/2) / 2^(df/2) / gamma(df/2) ,  x >= 0, df > 0  
                                      
    - Note: chi(x; df) = Gamma(x; df/2, 1/2)
	- External function required : gamma_pdf
  input 
       x : >= 0
	  df : > 0
  output
      chisq_pdf :
     info  = 0 : normal return
              1 : df <= 0
*/
	var pdf;
	info = 0;
	if( df <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	if( x < 0.0 ) pdf = 0.0;
	else pdf = gamma_pdf(x, df/2.0, 0.5, info);
	return pdf;
}

function chisq_cdf(x, df, info ) {
/* 
    - cdf of a chi-square distribution with df=df, chi(x; df), 
                                      
         pdf = x^(df/2-1) exp(-x/2) / 2^(df/2) / gamma(df/2) ,  x >= 0, df > 0  
         cdf = IG(x/2; df/2)
   
	- Note: chi(x; df) = Gamma(x; df/2, 1/2)
	- External function required : incomp_gamma
	  input 
       x : >= 0
	  df : > 0
	  output
      chisq_cdf : probability to the left of x
     info  = 0 : normal return
              1 : df <= 0
*/
	var cdf;
		info = 0;
	if( df <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) cdf = 0.0;
	else cdf = incomp_gamma(x/2.0, df/2.0, info);
		return cdf;
}

function incomp_gamma(x, p, info ) {
/*
	- Compute the Incomplete Gamma Integral, i.e.,
	         IG(x; p) = int_0^x t^p-1 e^-t dt  (x >= 0, p > 0)
		- External functions required:  lngamma = logarithm of the gamma function, and 
	                                stdnormal_cdf = cdf of standard normal dist. 
	  input 
      x  : >= 0
	  p  : > 0
	  output
     incomp_gamma : IG(x; p)
        info = 0 : normal return
                1 : p <= 0 
*/
	/*
    ALGORITHM AS239  APPL. STATIST. (1988) VOL. 37, NO. 3
*/
    var  pn1, pn2, pn3, pn4, pn5, pn6, tol, oflo; 
    var  xbig, darg, c, rn, a, b, one, zero, gammad;
    var  an, two, elimit, plimit, three, nine;
    var  temp;
	
	zero = 0.0; one = 1.0; two = 2.0; three = 3.0; nine = 9.0;
	elimit = -160.0; oflo = 1.0e+150; tol = 1.0e-14; xbig = 1.0e+8;
//	ORIGINAL SETTING  :  elimit = -88.0; oflo = 1.0e+37; tol = 1.0e-14; xbig = 1.0e+8;
	plimit = 1000.0; 
		gammad = zero;
	//	Check that we have valid values for x and p
		if (p <= zero) 
	{
	  info = 1;
	  return gammad;
	}
		info = 0;
	if (x <= zero) 
		return gammad;
	//	Use a normal approximation if p > plimit
		if (p > plimit) 
	{
		pn1 = three * Math.sqrt(p) * ( Math.pow(x/p, one/three) + one/(nine*p) - one );
		gammad = stdnormal_cdf(pn1);
		return  gammad;
	}
	//	if x is extremely large compared to p then set gammad = 1
		if (x > xbig) 
	{
		gammad = one;
		return	gammad;
	}
		if (x <= one || x < p) 
	{
	//	Use Pearson's series expansion.
//	(Note that p is not large enough to force overflow in lngamma).
//	No need to test error on exit since p > 0.
			darg = p * Math.log(x) - x - lngamma(p+one, info);
		c = one;
		gammad = one;
		a = p;
		do
		{
			a = a + one;
			c = c * x / a;
			gammad = gammad + c;
		} while (c>tol);
			darg = darg + Math.log(gammad);
		gammad = zero;
		if (darg >= elimit) 
			gammad = Math.exp(darg);
	}
	else
	{
		//	Use a continued fraction expansion
			darg = p * Math.log(x) - x - lngamma(p, info);
		a = one - p;
		b = a + x + one;
		c = zero;
		pn1 = one;
		pn2 = x;
		pn3 = x + one;
		pn4 = x * b;
		gammad = pn3 / pn4;
		
		do
		{
			a = a + one;
			b = b + two;
			c = c + one;
			an = a * c;
			pn5 = b * pn3 - an * pn1;
			pn6 = b * pn4 - an * pn2;
			
			if (Math.abs(pn6) > zero) 
			{
				rn = pn5 / pn6;
				temp = ( tol <= tol * rn )? tol : tol*rn; 
				if ( Math.abs(gammad - rn) <= temp ) 
//				if ( fabs(gammad - rn) <= __min(tol, tol * rn) ) 
					break;
				gammad = rn;
			}
				pn1 = pn3;
			pn2 = pn4;
			pn3 = pn5;
			pn4 = pn6;
			
			if (Math.abs(pn5) >= oflo) 
			{
				//	Re-scale terms in continued fraction if terms are large
					pn1 = pn1 / oflo;
				pn2 = pn2 / oflo;
				pn3 = pn3 / oflo;
				pn4 = pn4 / oflo;
			}
		} while(true);
			darg = darg + Math.log(gammad);
		gammad = one;
		if (darg >= elimit) 
			gammad = one - Math.exp(darg);
	}
		return gammad;
}

function chisq_inv(p, v, info ) {
/* 
    - percentile of a chi-square distribution with df=v, chi(x; v), 
                                      
         pdf = x^(v/2-1) exp(-x/2) / 2^(v/2) / gamma(v/2) ,  x >= 0, v > 0  
         cdf = IG(x/2; v/2)
         inv = 2*IG^-1(p; v/2)
		- Note: chi(x; v) = Gamma(x; v/2, 1/2)
	- External function required : lngamma, stdnormal_inv, incomp_gamma
	  input 
      p : [0.000002, 0.999998]
	  v : > 0
	  output
      chisq_inv : percentage points of the chi-squared distribution function.
     info  = 0 : normal return
              1 : v <= 0
*/
/*	
	        Algorithm AS 91   Appl. Statist. (1975) Vol.24, P.35
	
	        To evaluate the percentage points of the chi-squared
	        probability distribution function.
	
            p must lie in the range 0.000002 to 0.999998,
	        v must be positive,
	        g must be supplied and should be equal to  ln(gamma(v/2.0))   
				*** 'g' WAS EMBEDDED WITHIN THE FUNCTION BY G. KANG ***
		     Incorporates the suggested changes in AS R85 (vol.40(1), 
	     pp.233-5, 1991) which should eliminate the need for the limited
	     range for p above, though these limits have not been removed
	     from the routine.
	     If error = 4 is returned, the result is probably as accurate as
	     the machine will allow.
	
	
*/
	var j, maxit = 20;
	var g;
	var chi, aa, e, zero, half, one, two, three, six, pmin, pmax, 
		c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, 
		c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26, c27, c28, 
		c29, c30, c31, c32, c33, c34, c35, c36, c37, c38, 
		a, b, c, ch, p1, p2, q, s1, s2, s3, s4, s5, s6, t, x, xx;
		aa = 0.6931471806; e = 0.5e-6; pmin = 0.000002; pmax = 0.999998;
	zero = 0.0 ; half = 0.5 ; one = 1.0 ; two = 2.0 ; three = 3.0 ; six = 6.0;
	c1  = 0.01;    c2 = 0.222222; c3 = 0.32;   c4  = 0.4;     c5 = 1.24;    c6 = 2.2;
	c7  = 4.67;    c8 = 6.66;     c9 = 6.73;   c10 = 13.32;  c11 = 60.0;   c12 = 70.0;
	c13 = 84.0;   c14 = 105.0;   c15 = 120.0;  c16 = 127.0;  c17 = 140.0;  c18 = 175.0;
	c19 = 210.0;  c20 = 252.0;   c21 = 264.0;  c22 = 294.0;  c23 = 346.0;  c24 = 420.0;
	c25 = 462.0;  c26 = 606.0;   c27 = 672.0;  c28 = 707.0;  c29 = 735.0;  c30 = 889.0;
	c31 = 932.0;  c32 = 966.0;   c33 = 1141.0; c34 = 1182.0; c35 = 1278.0; c36 = 1740.0;
	c37 = 2520.0; c38 = 5040.0;
	
	g = lngamma( v/2.0, info );
	
	// test arguments and initialise
	
	chi = -one;
	info = 1;
		if( p < pmin ) return 0.0;
	if( p > pmax ) return LARGE;
	// if (p < pmin || p > pmax) return chi;
	
	info = 2;
	if ( v <= zero ) return chi;
	
	info = 0;
	xx = half * v;
	c = xx - one;
	
// starting approximation for small chi-squared
	
	if (v >= -c5 * Math.log(p)) 
	{
		if (v > c3) //3
		{
			x = stdnormal_inv(p, info);
			
			// starting approximation using Wilson and Hilferty estimate
			
			p1 = c2 / v;
			ch = v * Math.pow( (x * Math.sqrt(p1) + one - p1) , 3.0 );
			
			// starting approximation for p tending to 1
			
			if (ch > (c6 * v + six) )
				ch = -two * ( Math.log(one-p) - c * Math.log(half * ch) + g );
		}
		else // 1
		{
			ch = c4;
			a = Math.log(one-p);
	
			do // 2
			{
				q = ch;
				p1 = one + ch * (c7+ch);
				p2 = ch * (c9 + ch * (c8 + ch));
				t = -half + (c7 + two * ch) / p1 - (c9 + ch * (c10 + three * ch)) / p2;
				ch = ch - (one - Math.exp(a + g + half * ch + c * aa) * p2 / p1) / t;
			} while (Math.abs(q / ch - one) > c1); 
		}
	}
	else
	{
		ch = Math.pow( (p * xx * Math.exp(g + xx * aa)) , (one/xx) );
		
		if (ch < e) // 6
		{
			chi = ch;
			return chi;
		}	  
	}
		//4
	for (j=1; j<=maxit; j++)
	{
		q = ch;
		p1 = half * ch;
		p2 = p - incomp_gamma(p1, xx, info);
		
		if (info != 0) 
		{
			info = 3;
			return chi;
		}
		
		t = p2 * Math.exp(xx * aa + g + p1 - c * Math.log(ch));
		b = t / ch;
		a = half * t - b * c;
		s1 = (c19 + a * (c17 + a * (c14 + a * (c13 + a * (c12 + c11 * a))))) / c24;
		s2 = (c24 + a * (c29 + a * (c32 + a * (c33 + c35 * a)))) / c37;
		s3 = (c19 + a * (c25 + a * (c28 + c31 * a))) / c37;
		s4 = (c20 + a * (c27 + c34 * a) + c * (c22 + a * (c30 + c36 * a))) / c38;
		s5 = (c13 + c21 * a + c * (c18 + c26 * a)) / c37;
		s6 = (c15 + c * (c23 + c16 * c)) / c38;
		ch = ch + t * (one + half * t * s1 - b * c * (s1 - b * (s2 - b * (s3 - b * (s4 - b * (s5 - b * s6))))));
		
//		if (fabs(q / ch - one) > e) 
		if (Math.abs(q / ch - one) < e) 
		{
			chi = ch;
			return chi;
		}
	}
	info = 4;
	
	chi = ch;
	return chi;
}

function exponential_pdf(x, a, info ) {
/* 
    - pdf of an exponential distribution exp(x; a) 
   
         pdf = 1/a * exp ( -x/a ) ,  x >= 0, a > 0
  input 
      x : >= 0
	  a : > 0
  output
     exponential_pdf :
          info  = 0 : normal return
                   1 : a <= 0
*/
	var pdf;
	info = 0;
	if( a <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	if( x < 0.0 ) pdf = 0.0;
	else pdf = Math.exp ( - x / a ) / a;
	return pdf;
}

function exponential_cdf(x, a, info ) {
/* 
    - cdf of an exponential distribution exp(x; a)
   
         pdf = 1/a * exp ( -x/a )
         cdf = 1.0 - exp ( -x/a ),  x >= 0, a > 0
  input 
      x : >= 0
	  a : > 0
  output
     exponential_cdf : probability to the left of x
          info  = 0 : normal return
                   1 : a <= 0
*/
	var cdf;
	info = 0;
	if( a <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	if( x < 0.0 ) cdf = 0.0;
	else cdf = 1.0 - Math.exp ( - x / a );
	return cdf;
}

function exponential_inv(p, a, info ) {
/* 
    - percentile of an exponential distribution exp(x; a)
                                     
         pdf = 1/a * exp ( -x/a )  ,  x >= 0, a > 0
         inv = -a * ln(1.0-p)
   
  input 
      p : [0,1]
	  a : > 0
  output
     exponential_inv : percentile
          info  = 0 : normal return
                   1 : a <= 0 
*/
	var inv;
	info = 0;
	if( a <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	if( p <= 0.0 )      inv = 0.0;
	else if( p >= 1.0 ) inv = LARGE;
	else  inv = - a * Math.log(1.0-p);
	return inv;
}

function f_pdf(x, df1, df2, info ) {
/* 
    - pdf of an F distribution, F(x; df1, df2)
	         pdf = (a/b)^a/2 x^(a/2-1) (1+ax/b)^(-(a+b)/2) / B(a/2, b/2),  x>=0, a,b>0
	    - External function required : lnbeta
	  input 
             x : >= 0
	  df1, df2 : > 0
	  output
          f_pdf :
     info  = 0 : normal return
              1 : df1, df2 <= 0
*/
	var a, b, temp, pdf;
		a = df1;
	b = df2;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) pdf = 0.0;
	else {
		temp = a / 2.0 * ( Math.log(a) - Math.log(b) ) + (a/2.0-1.0)*Math.log(x) 
			   - (a+b)/2.0 * Math.log( 1.0 + a/b*x ) - lnbeta(a/2.0, b/2.0, info);
	    pdf = Math.exp( temp );
	}
		
	return pdf;
}

function f_cdf(x, df1, df2, info ) {
/*
    - cdf of an F distribution, F(x; df1, df2)
	         pdf = (a/b)^a/2 x^(a/2-1) (1+ax/b)^(-(a+b)/2) / B(a/2, b/2),  x>=0, a,b>0
         cdf = IB( ax/(b+ax); a/2, b/2)
		- External function required : lnbeta, incomp_beta
	  input 
             x : >= 0
	  df1, df2 : > 0
	  output
          f_cdf : probability to the left of x
     info  = 0 : normal return
              1 : df1, df2 <= 0
*/
	var a, b, temp1, temp2, cdf;
		a = df1;
	b = df2;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) cdf = 0.0;
	else {
		temp1 = a * x / ( b + a * x );
		temp2 = lnbeta( a/2.0, b/2.0, info );
		cdf = incomp_beta( temp1, a/2.0, b/2.0, temp2, info );
	}
		
	return cdf;
}

function f_inv(p, df1, df2, info ) {
/* 
    - percentile of an F distribution, F(x; df1, df2)
	         pdf = (a/b)^a/2 x^(a/2-1) (1+ax/b)^(-(a+b)/2) / B(a/2, b/2),  x>=0, a,b>0
         cdf = IB( ax/(b+ax); a/2, b/2)
         inv = b/a * IB^-1(p; a/2, b/2) / ( 1 - IB^-1(p; a/2, b/2) )
		- External function required : lnbeta, beta_inv
	  input 
             p : [0,1]
	  df1, df2 : > 0
	  output
          f_inv : percentile
     info  = 0 : normal return
              1 : df1, df2 <= 0
*/
	var a, b, temp1, temp2, inv;
		a = df1;
	b = df2;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p <= 0.0 ) inv = 0.0;
	else if ( p >= 1.0 ) inv = LARGE;
	else {
		temp1 = lnbeta( a/2.0, b/2.0, info );
		temp2 = beta_inv( p, a/2.0, b/2.0, temp1, info );
		inv = b / a * temp2 / (1.0 - temp2);
	}
		
	return inv;
}

function gamma_pdf(x, a, b, info ) {
/* 
    - pdf of a Gamma distribution Gamma(x; a, b)
	         pdf = b^a x^(a-1) exp(-bx) / Gamma(a) , x >= 0, a, b > 0 
		- External function required : lngamma
	  input 
         x : >= 0
	  a, b : > 0
	  output
      gamma_pdf :
     info  = 0 : normal return
              1 : a, b <= 0
*/
	var temp, pdf;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) pdf = 0.0;
	else {
		temp = a * Math.log(b) + (a-1.0) * Math.log(x) - b * x - lngamma(a, info);
	    pdf = Math.exp( temp );
	}
		
	return pdf;
}

function gamma_cdf(x, a, b, info ) {
/* 
    - cdf of a Gamma distribution Gamma(x; a, b)
	         pdf = b^a x^(a-1) exp(-bx) / Gamma(a) , x >= 0, a, b > 0 
         cdf = IG(bx;a)
		- External function required : incomp_gamma
	  input 
         x : >= 0
	  a, b : > 0
	  output
      gamma_cdf : probability to the left of x 
     info  = 0 : normal return
              1 : a, b <= 0
*/
	var cdf;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) cdf = 0.0;
	else cdf = incomp_gamma(b*x, a, info);
		
	return cdf;
}

function gamma_inv(p, a, b, info ) {
/* 
    - percentile of a Gamma distribution Gamma(x; a, b)
		- External function required : chisq_inv(p, df, info )
	  input 
      p : [0.000002, 0.999998]
	  a, b : > 0
	  output
      gamma_inv : percentage points of the Gamma distribution 
     info  = 0 : normal return
              1 : a, b <= 0
*/
	var inv, df, pmin, pmax;
	pmin = 0.000002;
	pmax = 0.999998;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p < pmin ) return 0.0;
	if( p > pmax ) return LARGE;
		df = 2.0 * a;
	inv = chisq_inv( p, df, info );
	inv = inv / 2.0 / b;
		return inv;
}

function laplace_pdf(x, a, b, info )
{
/* 
    - pdf of a Laplace(or double exponential) distribution Laplace(x; a, b), 
          
         pdf = (2*b)^-1 exp( -|x-a|/b ) ,  -inf<x<inf, -inf<a<inf, b>0
	  input 
      x : (-inf, inf)
	  a : (-inf, inf)
	  b : > 0
	  output
     laplace_pdf : 
      info  = 0 : normal return
               1 : b <= 0
*/
	var temp, pdf;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		temp = Math.abs(x-a) / b;
		pdf = Math.exp( -temp ) / 2.0 / b;
		
	return pdf;
}

function laplace_cdf(x, a, b, info ) {
/* 
    - cdf of a Laplace(or double exponential) distribution Laplace(x; a, b)
	         pdf = (2*b)^-1 exp( -|x-a|/b ) , -inf < x < inf, -inf < a < inf, b > 0
         cdf = 1/2 * exp( (x-a)/b )   if x <= a,   1 - 1/2 * exp( (a-x)/b )   if x > a
   
  input 
      x : (-inf, inf)
      a : (-inf, inf)
	  b : > 0
	  output
     laplace_cdf : probability to the left of x 
      info  = 0 : normal return
               1 : b <= 0
*/
	var temp, cdf;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		temp = (x-a) / b;
		if( x <= a )
		cdf = Math.exp( temp ) / 2.0;
	else
		cdf = 1.0 - Math.exp( -temp ) / 2.0;
		return cdf;
}

function laplace_inv(p, a, b, info ) {
/* 
    - percentile of a Laplace(or double exponential) distribution Laplace(x; a, b), 
	         pdf = (2*b)^-1 exp( -|x-a|/b ) , -inf < x < inf, -inf < a < inf, b > 0 
         cdf = 1/2 * exp( (x-a)/b ) if x <= a,   1 - 1/2 * exp( (a-x)/b ) if x > a
         inv = a + b*ln(2p)  if p <= 0.5,   a - b*ln(2(1-p))  if  p > 0.5
	  input 
      p : [0,1]
	  a : (-inf, inf)
	  b : > 0
	  output
     laplace_inv : percentile
      info  = 0 : normal return
               1 : b <= 0
*/
	var inv;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p <= 0.0 )      inv = -LARGE;
	else if( p >= 1.0 ) inv = LARGE;
	else if( p <= 0.5 )	inv = a + b * Math.log( 2.0 * p );
	else  inv = a - b * Math.log( 2.0 * (1.0-p) );
	
	return inv;
}

function logistic_pdf(x, a, b, info ) {
/* 
    - pdf of a logistic distribution Logistic(x; a, b)
                                  
         temp = (x-a)/b      
         pdf = 1/b * exp (-temp) * (1+exp(-temp))^-2 , -inf<x<inf, -inf<a<inf, b>0
	  input 
      x : (-inf, inf)
	  a : (-inf, inf)
	  b : > 0
	  output
     logistic_pdf :
       info  = 0 : normal return
                1 : b <= 0
*/
	var temp, pdf;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		temp = -(x-a) / b;
	if( temp > 700.0 ) pdf = 0.0;     // in exp(x), max. of x = 709.782712893
	else {
		pdf = 1.0 / b * Math.exp( temp ) / (1.0 + Math.exp( temp )) / (1.0 + Math.exp( temp ));
	}
		return pdf;
}

function logistic_cdf(x, a, b, info ) {
/* 
    - cdf of a logistic distribution Logistic(x; a, b)
	         temp = (x-a)/b      
         pdf = 1/b * exp (-temp) * (1+exp(-temp))^-2 , -inf<x<inf, -inf<a<inf, b>0
         cdf = (1+exp(-temp))^-1
	  input 
      x : (-inf, inf)
      a : (-inf, inf)
	  b : > 0
	  output
     logistic_cdf : probability to the left of x 
        info = 0 : normal return
                1 : b <= 0
*/
	var temp, cdf;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		temp = -(x-a) / b;
	if( temp > 700.0 ) cdf = 0.0;     // in exp(x), max. of x = 709.782712893
	else {
		cdf = 1.0 / (1.0 + Math.exp( temp )); 
	}
		return cdf;
}

function logistic_inv(p, a, b, info ) {
/* 
    - percentile of a logistic distribution Logistic(x; a, b)
	         temp = (x-a)/b      
         pdf = 1/b * exp (-temp) * (1+exp(-temp))^-2 , -inf<x<inf, -inf<a<inf, b>0
         cdf = (1+exp(-temp))^-1
         inv = a + b*ln( p/(1-p) )
	  input 
      p : [0,1]
      a : (-inf, inf)
      b : > 0
	  output
     logistic_inv : percentile
        info = 0 : normal return
                1 : b <= 0
*/
	var inv;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p <= 0.0 ) inv = -LARGE;
	else if( p >= 1.0 ) inv = LARGE;
	else inv = a + b * Math.log( p/(1.0-p) );
		return inv;
}

function lognormal_pdf(x, a, b, info ) {
/* 
    - pdf of a lognormal distribution LN(x; a, b)
	         pdf = (x*b*sqrt(2*pi))^-1 exp{ - (ln(x)-a))^2 / (2*b^2) } , x >= 0, b > 0  
	    - Note : T = (ln(x)-a)/b ~ N(0,1)
	    - External function required : stdnormal_pdf( z )
	  input 
      x : >= 0
	  a : (-inf, inf)
	  b : > 0
	  output
     lognormal_pdf :
        info  = 0 : normal return
                 1 : b <= 0
*/
	var temp, pdf;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) pdf = 0.0;
	else {
		temp = ( Math.log(x) - a ) / b;
	    pdf = stdnormal_pdf( temp );
		pdf = pdf / x / b;
	}
	
	return pdf;
}

function lognormal_cdf(x, a, b, info ) {
/* 
    - cdf of a lognormal distribution LN(x; a, b)
	         pdf = (x*b*sqrt(2*pi))^-1 exp{ - (ln(x)-a))^2 / (2*b^2) } , x >= 0, b > 0  
         cdf = Phi( (ln(x)-a) / b )
	    - Note : T = (ln(x)-a)/b ~ N(0,1)
	    - External function required : stdnormal_cdf( z )
	  input 
      x : >= 0
	  a : (-inf, inf)
	  b : > 0
	  output
     lognormal_cdf : probability to the left of x 
        info  = 0 : normal return
                 1 : b <= 0
*/
	var temp, cdf;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 ) cdf = 0.0;
	else {
		temp = ( Math.log(x) - a ) / b;
		cdf = stdnormal_cdf( temp );
	}
	
	return cdf;
}

function lognormal_inv(p, a, b, info ) {
/* 
    - percentile of a lognormal distribution LN(x; a, b)
	         pdf = (x*b*sqrt(2*pi))^-1 exp{ - (ln(x)-a))^2 / (2*b^2) } , x >= 0, b > 0  
         cdf = Phi( (ln(x)-a) / b )
         inv = exp{ a + b * inverse of Phi(p) }
	    - Note : T = (ln(x)-a)/b ~ N(0,1)
	    - External function required : stdnormal_inv( p, info )
	  input 
      p : [0,1]
	  a : (-inf, inf)
	  b : > 0
	  output
     lognormal_inv : percentile
         info = 0 : normal return
                 1 : b <= 0
*/
	var inv;
		info = 0;
	if( b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p <= 0.0 ) inv = 0.0;
	else if( p >= 1.0 ) inv = LARGE;
    else inv = Math.exp( a + b * stdnormal_inv( p, info ) );
		return inv;
}

function pareto_pdf(x, a, b, info ) {
/* 
    - pdf of a pareto distribution Pareto(x; a, b)
   
         pdf = b/a * ( a/x )^(b+1)  , x >= a > 0,  b > 0
	  input 
      x : >= a
	  a : > 0
      b : > 0
	  output
     pareto_pdf :
      info = 0 : normal return
              1 : x < a,  a <= 0 or b <= 0
*/
	var pdf;
		info = 0;
	if( a <= 0.0 || x < a || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		pdf = b / a * Math.pow( a/x, b+1.0 );
		return pdf;
}
		
function pareto_cdf(x, a, b, info ) {
/* 
    - cdf of a pareto distribution Pareto(x; a, b)
   
         pdf = b/a * ( a/x )^(b+1)  , x >= a > 0,  b > 0
         cdf = 1 - (a/x)^b
	  input 
      x : >= a
	  a : > 0
	  b : > 0
	  output
     pareto_cdf : probability to the left of x 
	  info = 0 : normal return
              1 : a <= 0 or b <= 0
*/
	var cdf;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 || x < a ) cdf = 0.0;
	else cdf = 1.0 - Math.pow( a/x, b );
		return cdf;
}

function pareto_inv(p, a, b, info ) {
/* 
    - percentile of a pareto distribution Pareto(x; a, b)
   
         pdf = b/a * ( a/x )^(b+1)  , x >= a > 0,  b > 0
         cdf = 1 - (a/x)^b
         inv = a*(1-p)^(-1/b)
	  input 
      p : [0,1]
	  a : > 0
	  b : > 0
	  output
     pareto_inv : percentile  
      info = 0 : normal return
              1 : a <= 0, b <= 0
*/
	var inv;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p <= 0.0 ) inv = a;
	else if( p >= 1.0 ) inv = LARGE;
	else inv = a / Math.pow( 1.0-p, 1.0/b );
		return inv;
}

function uniformc_pdf(x, a, b, info )
{
/* 
    - pdf of a continuous uniform distribution unif[a,b]
	         pdf = (b-a)^-1  , -inf < a < b < inf , a<= x <=b  
	  input 
         x : [a,b]
	  a, b : -inf < a < b < inf 
	  output
     uniformc_pdf :
        info = 0 : normal return
                1 : a >= b 
*/
	var pdf;
		info = 0;
	if( a >= b ) {
		info = 1;
		return -1.0;
	}
		if( x < a || x > b ) 
		pdf = 0.0;
	else
		pdf = 1.0 / (b-a);
		return pdf;
}

function uniformc_cdf(x, a, b, info ) {
/* 
    - cdf of a continuous uniform distribution unif[a,b]
   
         pdf = (b-a)^-1  , -inf < a < b < inf , a<= x <=b  
         cdf = (x-a) / (b-a)
	  input 
          x : [a,b]
	   a, b : -inf < a < b < inf 
	  output
     uniformc_cdf : probability to the left of x 
        info = 0 : normal return
                1 : a >= b
*/
	var cdf;
		info = 0;
	if( a >= b ) {
		info = 1;
		return -1.0;
	}
		if( x < a ) cdf = 0.0;
	else if( x > b ) cdf = 1.0;
	else cdf = (x-a) / (b-a);
		return cdf;
}

function uniformc_inv(p, a, b, info ) {
/* 
    - percentile of a continuous uniform distribution unif[a,b]
	         pdf = (b-a)^-1  , -inf < a < b < inf , a<= x <=b  
         cdf = (x-a) / (b-a)
         inv = a + (b-a)*p
	  input 
         p : [0,1]
	  a, b : -inf < a < b < inf 
	  output
     uniformc_inv : percentile  
        info = 0 : normal return
                1 : a >= b
*/
	var inv;
		info = 0;
	if( a >= b ) {
		info = 1;
		return a-2.0;
	}
		if( p < 0.0 ) inv = a; 
	else if( p > 1.0 ) inv = b;
	else inv = a + (b-a)*p;
		return inv;
}

function weibull_pdf(x, a, b, info ) {
/* 
    - pdf of a Weibull distribution Weib(x; a, b)
   
         pdf = b/a (x/a)^b-1 exp( -(x/a)^b ) ,  x >= 0,  a, b > 0  
	  input 
         x : >= 0
	  a, b : > 0
	  output
     weibull_pdf : 
       info = 0 : normal return
               1 : a, b <= 0  
*/
	var temp, pdf;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x == 0.0 )
		pdf = 0.0;
	else {
	    temp = Math.pow( x/a, b);
		pdf = b/x * temp * Math.exp( -temp ); 
	}
		return pdf;
}

function weibull_cdf(x, a, b, info ) {
/* 
    - cdf of a Weibull distribution Weib(x; a, b)
	         pdf = b/a (x/a)^b-1 exp( -(x/a)^b ) ,  x >= 0,  a, b > 0  
         cdf = 1.0 - exp( -(x/a)^b )    
	  input 
         x : >= 0
	  a, b : > 0
	  output
     weibull_cdf : probability to the left of x 
       info = 0 : normal return
               1 : a, b <= 0  
*/
	var temp, cdf;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( x <= 0.0 )
		cdf = 0.0;
	else {
	    temp = Math.pow( x/a, b);
		cdf = 1.0 - Math.exp( -temp ); 
	}
		return cdf;
}

function weibull_inv(p, a, b, info ) {
/* 
    - percentile of a Weibull distribution Weib(x; a, b)
	         pdf = b/a (x/a)^b-1 exp( -(x/a)^b ) ,  x >= 0,  a, b > 0  
         cdf = 1.0 - exp( -(x/a)^b )    
         inv = a*(-ln(1-p))^(1/b)
	  input 
         p : [0,1]
	  a, b : > 0
	  output
     weibull_inv : percentile  
       info = 0 : normal return
               1 : a, b <= 0  
*/
	var temp, inv;
		info = 0;
	if( a <= 0.0 || b <= 0.0 ) {
		info = 1;
		return -1.0;
	}
		if( p <= 0.0 ) inv = 0.0; 
	else if( p >= 1.0 ) inv = LARGE;
	else{
		temp = -Math.log(1.0-p);
		inv = a * Math.pow( temp, 1.0/b );
	}
		return inv;
}

function binomial_pdf( x, n, p, info ) {
/* 
    - pdf of a binomial distribution BIN(x; n, p)
   
         pdf = nCx p^x (1-p)^n-x ,  x = 0, 1, 2, ...., n  
	  input 
	  x : (0,1, ..., n)
      n : >= 1, integer
	  p : [0,1]
	  output
     binomial_pdf : 
	    info = 0 : normal return
                1 : p < 0 or p > 1
*/
    var i;
    var pval, temp1, temp2;
		info = 0;
    if( p<0.0 || p>1.0 ) {
		info = 1;
		return -1.0;
	}
	    if( p==0.0 || p==1.0 ) return 0.0;
	if( x < 0 || x > n ) return 0.0;
	if( x == 0 ) {
            pval = Math.exp( n * Math.log(1.0-p) );
	}
        else if( x == n ) {
            pval = Math.exp( n * Math.log(p) );
	}
        else {
            temp1 = 0.0; temp2 = 0.0;
            for(i=1; i<=x; i++) {
		temp1 += Math.log( (n+1-i) );
                temp2 += Math.log( (i) );
	    }
            pval = temp1 - temp2 + x * Math.log(p) + (n-x) * Math.log(1.0-p);
            pval = Math.exp(pval);
	}
	return pval;
}

function binomial_cdf( x, n, p, info ) {
/* 
    - cdf of a binomial distribution BIN(x; n, p)
   
         pdf = nCx p^x (1-p)^x ,  x = 0, 1, 2, ...., n  
         cdf = sum_0^x nCk p^k (1-p)^k ,  x = 0, 1, 2, ...., n  
	  input 
	  x : (0,1, ..., n)
      n : >= 1, integer
	  p : [0,1]
	  output
     binomial_cdf : probability to the left of x
	    info = 0 : normal return
                1 : p < 0 or p > 1
*/
    var j, k, mode;
    var pval, cumval, temp;
		info = 0;
    if( p<0.0 || p>1.0 ) {
		info = 1;
		return -1.0;
	}
		if( x < 0 ) cumval = 0.0;
	if( x > n ) cumval = 1.0;
	    if( x == 0 ) {
        if( p >= 1.0 ) cumval = 0.0;
        else cumval = Math.exp( n * Math.log(1.0-p) );
	}
    else if( x == n ) {
        cumval = 1.0;
	}
    else {
        if( p <= 0.0 ) cumval = 1.0;
        else if( p >= 1.0 ) cumval = 0.0;
        else {
			mode = Math.floor( (n+1) * p );
            if( x <= mode ) j = x;
            else j = mode;
            pval = binomial_pdf(j, n, p, info);
            cumval = pval;
//
            if( x <= mode ) {
				for(k=x-1; k>=0; k--) {
					pval *= (1.0-p) / p * (k+1) / (n-k);
                    cumval += pval;
				}
			}
            else {
				temp = pval;
                for(k=mode-1; k>=0; k--) {
					pval *= (1.0-p) / p * (k+1) / (n-k);
                    cumval += pval;
				}
				pval = temp;
				for(k=mode+1; k<=x; k++) {
					pval *= p / (1.0-p)  * (n-k+1) / (k);
					cumval += pval;
				}
			} 
		}
	}
	
	return cumval;
}
	
function poisson_pdf( x, m, info ) {
/* 
    - pdf of a Poisson distribution POI(x; m)
   
         pdf = m^x / x! e^-m ,  x = 0, 1, 2, ....  
	  input 
	  x : 0, 1, ...
      m : > 0
	  output
     poisson_pdf : 
       info = 0 : normal return
               1 : m <= 0 
*/
    var i;
    var pval, temp1;
		info = 0;
    if( m <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	    if( x < 0.0 ) return 0.0;
	    if( x == 0 ) {
		pval = Math.exp( -m );
	}
    else {
		temp1 = 0.0;
	    for(i=2; i<=x; i++) 
		     temp1 += Math.log( i );
        pval = -m + x*Math.log(m) - temp1;
        pval = Math.exp(pval);
	}
	    return pval;
}

function poisson_cdf( x, m, info ) {
/* 
    - cdf of a Poisson distribution POI(x; m)
   
         pdf = m^x / x! e^-m ,  x = 0, 1, 2, ....  
         cdf = sum_0^x m^k / k! e^-m ,  x = 0, 1, 2, ....  
	  input 
	  x : 0, 1, ...
      m : > 0
	  output
     poisson_cdf : probability to the left of x
       info = 0 : normal return
               1 : m <= 0 
*/
	var j, k, mode, ix;
	var pval, cumval, temp;
	
	info = 0;
    if( m <= 0.0 ) {
		info = 1;
		return -1.0;
	}
	    if( x < 0.0 ) return 0.0;
		ix = x;
	if( ix == 0 ) {
		cumval = Math.exp( -m );
	}
	else {
		mode = Math.floorm;
		if( ix <= mode ) j = ix;
		else j = mode;
		pval = poisson_pdf(j, m, info);
		cumval = pval;
		//
		if( ix <= mode ) {
			for(k=ix-1; k>=0; k--) {
				pval *= (k+1) / m;
				cumval += pval;
			}
		}
		else {
			temp = pval;
			for(k=mode-1; k>=0; k--) {
				pval *= (k+1) / m;
				cumval += pval;
			}
			pval = temp;
			for(k=mode+1; k<=ix; k++) {
				pval *= m / (k);
				cumval += pval;
			}
		} 
	}
	return cumval;
}

function geometric_pdf( x, p, info ) {
/* 
    - pdf of a geometric distribution GEO(x; p)
   
         pdf = p(1-p)^x-1 ,  x = 1, 2, ....
	  input 
      x : 1, 2, ... 
	  p : (0,1]
	  output
     geometric_pdf :
	     info = 0 : normal return
                 1 : p <= 0 or p > 1
*/
    var pval, temp;
		info = 0;
    if( p<=0.0 || p>1.0 ) {
		info = 1;
		return -1.0;
	}
		if( p == 1.0 ) return 0.0;
	if( x <= 0 ) return 0.0;
	    if( x == 1 ) {
        pval = p; 
	}
    else {
        temp = Math.log(p) + ((x-1)) * Math.log(1.0-p); 
		pval = Math.exp(temp);
	}
	    return pval;
}

function geometric_cdf( x, p, info ) {
/* 
    - cdf of a geometric distribution GEO(x; p)
   
         pdf = p(1-p)^x-1 ,  x = 1, 2, ....
         cdf = 1 - (1-p)^x , 
	  input 
      x : 1, 2, ... 
	  p : (0,1]
	  output
     geometric_cdf : probability to the left of x
	     info = 0 : normal return
                 1 : p <= 0 or p > 1
*/
    var cdf;
		info = 0;
    if( p<=0.0 || p>1.0 ) {
		info = 1;
		return -1.0;
	}
		if( p == 1.0 ) return 1.0;
	if( x <= 0 ) return 0.0;
		cdf = 1.0 - Math.pow( 1.0-p, x );
	    return cdf;
}

function hypergeo_pdf( x, n, M, N, info ) {
/* 
    - pdf of a Hypergeometric distribution Hyper(x; n, M, N)
   
         pdf = ( MCx (N-M)C(n-x) ) / NCn ,  x = max(0,n+M-N), ..., min(n,M)
		                                 N=1,2, ...; n=1,2,...,N; M=1,2,...,N
	  input 
      x : max(0,n+M-N), ..., min(n,M)
	  N : 1,2, ...
	  n : 1,2,...,N
	  M : 1,2,...,N
	  output
     hypergeo_pdf :
	    info = 0 : normal return
                1 : N < 1 , n < 1 or n > N , M < 1 or M > N
*/
	    var pdf, itemp;
		info = 0;
    if( N<1 || n<1 || n>N || M<1 || M>N ) {
		info = 1;
		return -1.0;
	}
    
	itemp = ( (n+M-N) >= 0 )? (n+M-N) : 0;
	if(x < itemp) return 0.0;
	
	itemp = ( n < M )? n : M ;
	if(x > itemp) return 0.0;
	    pdf = chyper( 1, n, x, N, M, info );
//  double chyper( int POINT, int KK, int LL, int MM, int NN, int *IFAULT )
//  (NN/LL)(MM-NN/KK-LL) / (MM/KK) 
	    return pdf;
}

function chyper( POINT, KK, LL, MM, NN, IFAULT ) {
/*
	POINT = 1 for pdf : (NN/LL)(MM-NN/KK-LL) / (MM/KK) 
	        2 for cdf
	    *IFAULT = 0 : normal return
	          1 : (an error)
			  2 : (a warning)
			  3 : (a warning)
	     ALGORITHM AS R77  APPL. STATIST. (1989), VOL.38, NO.1
     REPLACES AS 59 AND AS 152
     INCORPORATES AS R86 FROM VOL.40(2)
	     - External function required: lngamma, stdnormal_cdf
*/
    var K, L, M, N, I, J, NL, KL, MNKL, MVBIG, MBIG;
    var itemp, itemp2, info=0;
    var CHYPER, ZERO, ONE, P, PT;
    var HALF, ELIMIT;
    var dMEAN;
    var SIG, SXTEEN;
    var SCALE, ROOTPI, ARG, HUNDRD;
    var temp;
    var DIR;
	    ZERO = 0.0; HALF = 0.5; ONE = 1.0; MVBIG = 1000;
    MBIG = 600; ELIMIT = -160.0;
	SXTEEN = 16.0;
    SCALE = 1.0e300; ROOTPI = 2.506628274631001; HUNDRD = 100.0;
	    K = KK + 1;
    L = LL + 1;
    M = MM + 1;
    N = NN + 1;
    DIR = true;
	//     CHECK ARGUMENTS ARE WITHIN PERMITTED LIMITS
	    IFAULT = 1;
    CHYPER = ZERO;
    if(N < 1 || M < N || K < 1 || K > M) return CHYPER; 
	    IFAULT = 2;
    if(L < 1 || (K-L) > (M-N) ) return CHYPER;
    if(POINT==2) CHYPER = ONE;
    if(L > N || L > K) return CHYPER;
    IFAULT = 0;
    CHYPER = ONE;
    if(K == 1 || K == M || N == 1 || N == M) return CHYPER;
	itemp = ( KK > NN )? NN : KK;
    if(POINT == 2 && LL == itemp) return CHYPER;
	    P = NN / (MM - NN);
    itemp = ( KK > (MM-KK) )? (MM-KK) : KK;
	temp = ( P > ONE/P )? P : ONE/P;
    if( itemp > (SXTEEN * temp) && MM > MVBIG && ELIMIT > -HUNDRD ) 
	{
//     USE A NORMAL APPROXIMATION
			dMEAN = (KK) * (NN) / (MM);
		SIG = Math.sqrt( dMEAN * ( (MM-NN) / (MM) ) * ( (MM-KK) /
                    (MM-1) ) );
        if(POINT==1)
		{
			ARG = -HALF * (( (LL) - dMEAN ) / SIG) * (( (LL) - dMEAN ) / SIG);
            CHYPER = ZERO;
			if(ARG >= ELIMIT) CHYPER = Math.exp(ARG) / (SIG * ROOTPI);
		}
		else
		{
			CHYPER = stdnormal_cdf( ( (LL) + HALF - dMEAN ) / SIG );
		}
	}
	else
	{
//     CALCULATE EXACT HYPERGEOMETRIC PROBABILITIES.
//     INTERCHANGE K AND N IF THIS SAVES CALCULATIONS.
			itemp  = ( K-1 > M-K )? M-K : K-1;
		itemp2 = ( N-1 > M-N )? M-N : N-1;
		if( itemp > itemp2 ) 
		{
			I = K;
            K = N;
            N = I;
		}
        if( M-K < K-1 ) 
		{
			DIR = !DIR;
            L = N - L + 1;
            K = M - K + 1;
		}
			if( MM > MBIG ) 
		{
//          TAKE LOGARITHMS OF FACTORIALS.
				P = lngamma(NN, info) - lngamma(MM, info) + 
				lngamma((MM-KK), info) + lngamma(KK, info) +
                lngamma((MM-NN), info) - lngamma(LL, info) -  
				lngamma((NN-LL), info) - lngamma((KK-LL), info) -
                lngamma((MM-NN-KK+LL), info);
			CHYPER = ZERO;
            if(P >= ELIMIT) CHYPER = Math.exp(P);
		}
		else
		{
//          USE FREEMAN/LUND ALGORITHM
				for(I=1; I<=L-1; I++)
				CHYPER = CHYPER * (K-I) * (N-I) / ( (L-I) *
                           (M-I) );
			if(L != K) 
			{
				J = M - N + L;
				for(I=L; I<=K-1; I++)
					CHYPER = CHYPER * (J-I) / (M-I);
			}
		}
	        if(POINT == 1) return CHYPER;
        if(CHYPER == ZERO) 
		{
//          WE MUST RECOMPUTE THE POINT PROBABILITY SINCE IT HAS UNDERFLOWED.
				if(MM <= MBIG)
				P = lngamma(NN, info) - lngamma(MM, info) + 
				    lngamma(KK, info) + lngamma((MM-NN), info) - 
					lngamma(LL, info) - lngamma((NN-LL), info) - 
				    lngamma((KK-LL), info) - lngamma((MM-NN-KK+LL), info) + 
					lngamma((MM-KK), info);
			P = P + Math.log(SCALE);
			if(P < ELIMIT) 
			{
				IFAULT = 3;
				if( (LL) > (NN*KK + NN + KK + 1) / (MM + 2) ) CHYPER = ONE;
				return CHYPER;
			}
			else
			{
				P = Math.exp(P);
			}
		}
		else
		{
//           SCALE UP AT THIS POINT.
				P = CHYPER * SCALE;
		}
	        PT = ZERO;
        NL = N - L;
        KL = K - L;
        MNKL = M - N - KL + 1;
        if(L <= KL) 
		{
			for(I=1; I<=L-1; I++)
			{
				P = P * (L-I) * (MNKL-I) /
                        ( (NL+I) * (KL+I) );
				PT = PT + P;
			}
			if(P == ZERO) IFAULT = 3;
		}
		else
		{
			DIR = !DIR;
			for(J=0; J<=KL-1; J++)
			{
				P = P * (NL-J) * (KL-J) / ( (L+J) * (MNKL+J) );
                PT = PT + P;
			}
			if(P == ZERO) IFAULT = 3;
		}
	        if(DIR) 
			CHYPER = CHYPER + (PT / SCALE);
		else
			CHYPER = ONE - (PT / SCALE);
	}
		return CHYPER;
	}
	
function hypergeo_cdf( x, n, M, N, info ) {
/* 
    - cdf of a Hypergeometric distribution Hyper(x; n, M, N)
   
         pdf = ( MCx (N-M)C(n-x) ) / NCn ,  x = max(0,n+M-N), ..., min(n,M)
		                                 N=1,2, ...; n=1,2,...,N; M=1,2,...,N
         cdf = sum_{k=max(0, n+M-N)}^x prob(X=k)
	  input 
      x : max(0,n+M-N), ..., min(n,M)
	  N : 1,2, ...
	  n : 1,2,...,N
	  M : 1,2,...,N
	  output
     hypergeo_cdf : probability to the left of x
	    info = 0 : normal return
                1 : N < 1 , n < 1 or n > N , M < 1 or M > N
*/
	    var cdf, itemp;
		info = 0;
    if( N<1 || n<1 || n>N || M<1 || M>N ) {
		info = 1;
		return -1.0;
	}
    
	itemp = ( (n+M-N) >= 0 )? (n+M-N) : 0;
	if(x < itemp) return 0.0;
	
	itemp = ( n < M )? n : M ;
	if(x > itemp) return 1.0;
	    cdf = chyper( 2, n, x, N, M, info );
//  double chyper( int POINT, int KK, int LL, int MM, int NN, int *IFAULT )
//  (NN/LL)(MM-NN/KK-LL) / (MM/KK) 
	    return cdf;
}

function q_inv(p, df1, df2, info ) {
/* 
    - percentile of an Standardized Range distribution, q(x; df1, df2)
	  input 
             p : [0,1]
	  df1, df2 : > 0
	  output
          f_inv : percentile
      info  = 0 : normal return
              1 : df1, df2 <= 0
*/
        var i,j,inv,temp;
        var nrow = 30;
        var ncol = 21;
	var r95 = new Array(nrow);
        var r99 = new Array(nrow);
        for (j=0; j<nrow; j++) {
          r95[j] = new Array(ncol);
          r99[j] = new Array(ncol);
        }

  r95[1][2]=17.97;r95[1][3]=26.98;r95[1][4]=32.82;r95[1][5]=37.08;r95[1][6]=40.41;r95[1][7]=43.12;r95[1][8]=45.4; r95[1][9]=47.36;r95[1][10]=49.07;r95[1][11]=50.59;r95[1][12]=51.96;r95[1][13]=53.2; r95[1][14]=54.33;r95[1][15]=55.36;r95[1][16]=56.32;r95[1][17]=57.22;r95[1][18]=58.04;r95[1][19]=58.83;r95[1][20]=59.56;
  r95[2][2]=6.08; r95[2][3]=8.33; r95[2][4]=9.8;  r95[2][5]=10.88;r95[2][6]=11.74;r95[2][7]=12.44;r95[2][8]=13.03;r95[2][9]=13.54;r95[2][10]=13.99;r95[2][11]=14.39;r95[2][12]=14.75;r95[2][13]=15.08;r95[2][14]=15.38;r95[2][15]=15.65;r95[2][16]=15.91;r95[2][17]=16.37;r95[2][18]=16.14;r95[2][19]=16.57;r95[2][20]=16.77;
  r95[3][2]=4.5;  r95[3][3]=5.91; r95[3][4]=6.82; r95[3][5]=7.5;  r95[3][6]=8.04; r95[3][7]=8.48; r95[3][8]=8.85; r95[3][9]=9.18; r95[3][10]=9.46; r95[3][11]=9.72; r95[3][12]=9.95; r95[3][13]=10.15;r95[3][14]=10.35;r95[3][15]=10.52;r95[3][16]=10.69;r95[3][17]=10.84;r95[3][18]=10.98;r95[3][19]=11.11;r95[3][20]=11.24;
  r95[4][2]=3.93; r95[4][3]=5.04; r95[4][4]=5.76; r95[4][5]=6.29; r95[4][6]=6.71; r95[4][7]=7.05; r95[4][8]=7.35; r95[4][9]=7.6;  r95[4][10]=7.83; r95[4][11]=8.03; r95[4][12]=8.21; r95[4][13]=8.37; r95[4][14]=8.52; r95[4][15]=8.66; r95[4][16]=8.79; r95[4][17]=8.91; r95[4][18]=9.03; r95[4][19]=9.13; r95[4][20]=9.23;
  r95[5][2]=3.64; r95[5][3]=4.6;  r95[5][4]=5.22; r95[5][5]=5.67; r95[5][6]=6.03; r95[5][7]=6.33; r95[5][8]=6.58; r95[5][9]=6.8;  r95[5][10]=6.99; r95[5][11]=7.71; r95[5][12]=7.32; r95[5][13]=7.47; r95[5][14]=7.6;  r95[5][15]=7.72; r95[5][16]=7.83; r95[5][17]=7.93; r95[5][18]=8.03; r95[5][19]=8.12; r95[5][20]=8.21;
  r95[6][2]=3.46; r95[6][3]=4.34; r95[6][4]=4.9;  r95[6][5]=5.3;  r95[6][6]=5.63; r95[6][7]=5.9;  r95[6][8]=6.12; r95[6][9]=6.32; r95[6][10]=6.49; r95[6][11]=6.65; r95[6][12]=6.79; r95[6][13]=6.92; r95[6][14]=7.03; r95[6][15]=7.14; r95[6][16]=7.24; r95[6][17]=7.34; r95[6][18]=7.43; r95[6][19]=7.51; r95[6][20]=7.59;
  r95[7][2]=3.34; r95[7][3]=4.16; r95[7][4]=4.68; r95[7][5]=5.06; r95[7][6]=5.36; r95[7][7]=5.61; r95[7][8]=5.82; r95[7][9]=6;	  r95[7][10]=6.16; r95[7][11]=6.3;  r95[7][12]=6.43; r95[7][13]=6.55; r95[7][14]=6.66; r95[7][15]=6.76; r95[7][16]=6.85; r95[7][17]=6.94; r95[7][18]=7.02; r95[7][19]=7.1;  r95[7][20]=7.17;
  r95[8][2]=3.26; r95[8][3]=4.04; r95[8][4]=4.53; r95[8][5]=4.89; r95[8][6]=5.17; r95[8][7]=5.4;  r95[8][8]=5.6;  r95[8][9]=5.77; r95[8][10]=5.92; r95[8][11]=6.05; r95[8][12]=6.18; r95[8][13]=6.29; r95[8][14]=6.39; r95[8][15]=6.48; r95[8][16]=6.57; r95[8][17]=6.65; r95[8][18]=6.73; r95[8][19]=6.8;  r95[8][20]=6.87;
  r95[9][2]=3.2;  r95[9][3]=3.95; r95[9][4]=4.41; r95[9][5]=4.76; r95[9][6]=5.02; r95[9][7]=5.24; r95[9][8]=5.43; r95[9][9]=5.59; r95[9][10]=5.74; r95[9][11]=5.87; r95[9][12]=5.98; r95[9][13]=6.09; r95[9][14]=6.19; r95[9][15]=6.28; r95[9][16]=6.36; r95[9][17]=6.44; r95[9][18]=6.51; r95[9][19]=6.58; r95[9][20]=6.64;
  r95[10][2]=3.15;r95[10][3]=3.88;r95[10][4]=4.33;r95[10][5]=4.65;r95[10][6]=4.91;r95[10][7]=5.12;r95[10][8]=5.3; r95[10][9]=5.46;r95[10][10]=5.6; r95[10][11]=5.72;r95[10][12]=5.83;r95[10][13]=5.93;r95[10][14]=6.03;r95[10][15]=6.11;r95[10][16]=6.19;r95[10][17]=6.27;r95[10][18]=6.34;r95[10][19]=6.4; r95[10][20]=6.47;
  r95[11][2]=3.11;r95[11][3]=3.82;r95[11][4]=4.26;r95[11][5]=4.57;r95[11][6]=4.82;r95[11][7]=5.03;r95[11][8]=5.2; r95[11][9]=5.35;r95[11][10]=5.49;r95[11][11]=5.61;r95[11][12]=5.71;r95[11][13]=5.81;r95[11][14]=5.9; r95[11][15]=5.98;r95[11][16]=6.06;r95[11][17]=6.13;r95[11][18]=6.2; r95[11][19]=6.27;r95[11][20]=6.33;
  r95[12][2]=3.08;r95[12][3]=3.77;r95[12][4]=4.2; r95[12][5]=4.51;r95[12][6]=4.75;r95[12][7]=4.95;r95[12][8]=5.12;r95[12][9]=5.27;r95[12][10]=5.39;r95[12][11]=5.51;r95[12][12]=5.61;r95[12][13]=5.71;r95[12][14]=5.8; r95[12][15]=5.88;r95[12][16]=5.95;r95[12][17]=6.02;r95[12][18]=6.09;r95[12][19]=6.15;r95[12][20]=6.21;
  r95[13][2]=3.06;r95[13][3]=3.73;r95[13][4]=4.15;r95[13][5]=4.45;r95[13][6]=4.69;r95[13][7]=4.88;r95[13][8]=5.05;r95[13][9]=5.19;r95[13][10]=5.32;r95[13][11]=5.43;r95[13][12]=5.53;r95[13][13]=5.63;r95[13][14]=5.71;r95[13][15]=5.79;r95[13][16]=5.86;r95[13][17]=5.93;r95[13][18]=5.99;r95[13][19]=6.05;r95[13][20]=6.11;
  r95[14][2]=3.03;r95[14][3]=3.7; r95[14][4]=4.11;r95[14][5]=4.41;r95[14][6]=4.64;r95[14][7]=4.83;r95[14][8]=4.99;r95[14][9]=5.13;r95[14][10]=5.25;r95[14][11]=5.36;r95[14][12]=5.46;r95[14][13]=5.55;r95[14][14]=5.64;r95[14][15]=5.71;r95[14][16]=5.79;r95[14][17]=5.85;r95[14][18]=5.91;r95[14][19]=5.97;r95[14][20]=6.03;
  r95[15][2]=3.01;r95[15][3]=3.67;r95[15][4]=4.08;r95[15][5]=4.37;r95[15][6]=4.59;r95[15][7]=4.78;r95[15][8]=4.94;r95[15][9]=5.08;r95[15][10]=5.2; r95[15][11]=5.31;r95[15][12]=5.4; r95[15][13]=5.49;r95[15][14]=5.57;r95[15][15]=5.65;r95[15][16]=5.72;r95[15][17]=5.78;r95[15][18]=5.85;r95[15][19]=5.9; r95[15][20]=5.96;
  r95[16][2]=3;	  r95[16][3]=3.65;r95[16][4]=4.05;r95[16][5]=4.33;r95[16][6]=4.56;r95[16][7]=4.74;r95[16][8]=4.9; r95[16][9]=5.03;r95[16][10]=5.15;r95[16][11]=5.26;r95[16][12]=5.35;r95[16][13]=5.44;r95[16][14]=5.52;r95[16][15]=5.59;r95[16][16]=5.66;r95[16][17]=5.73;r95[16][18]=5.79;r95[16][19]=5.84;r95[16][20]=5.9;
  r95[17][2]=2.98;r95[17][3]=3.63;r95[17][4]=4.02;r95[17][5]=4.3; r95[17][6]=4.52;r95[17][7]=4.7; r95[17][8]=4.86;r95[17][9]=4.99;r95[17][10]=5.11;r95[17][11]=5.21;r95[17][12]=5.31;r95[17][13]=5.39;r95[17][14]=5.47;r95[17][15]=5.54;r95[17][16]=5.61;r95[17][17]=5.67;r95[17][18]=5.73;r95[17][19]=5.79;r95[17][20]=5.84;
  r95[18][2]=2.97;r95[18][3]=3.61;r95[18][4]=4;	  r95[18][5]=4.28;r95[18][6]=4.49;r95[18][7]=4.67;r95[18][8]=4.82;r95[18][9]=4.96;r95[18][10]=5.07;r95[18][11]=5.17;r95[18][12]=5.27;r95[18][13]=5.35;r95[18][14]=5.43;r95[18][15]=5.5; r95[18][16]=5.57;r95[18][17]=5.63;r95[18][18]=5.69;r95[18][19]=5.74;r95[18][20]=5.79;
  r95[19][2]=2.96;r95[19][3]=3.59;r95[19][4]=3.98;r95[19][5]=4.25;r95[19][6]=4.47;r95[19][7]=4.65;r95[19][8]=4.79;r95[19][9]=4.92;r95[19][10]=5.04;r95[19][11]=5.14;r95[19][12]=5.23;r95[19][13]=5.31;r95[19][14]=5.39;r95[19][15]=5.46;r95[19][16]=5.53;r95[19][17]=5.59;r95[19][18]=5.65;r95[19][19]=5.7; r95[19][20]=5.75;
  r95[20][2]=2.95;r95[20][3]=3.58;r95[20][4]=3.96;r95[20][5]=4.23;r95[20][6]=4.45;r95[20][7]=4.62;r95[20][8]=4.77;r95[20][9]=4.9; r95[20][10]=5.01;r95[20][11]=5.11;r95[20][12]=5.2; r95[20][13]=5.28;r95[20][14]=5.36;r95[20][15]=5.43;r95[20][16]=5.49;r95[20][17]=5.55;r95[20][18]=5.61;r95[20][19]=5.66;r95[20][20]=5.71;
  r95[21][2]=2.92;r95[21][3]=3.53;r95[21][4]=3.9; r95[21][5]=4.17;r95[21][6]=4.37;r95[21][7]=4.54;r95[21][8]=4.68;r95[21][9]=4.81;r95[21][10]=4.92;r95[21][11]=5.01;r95[21][12]=5.1; r95[21][13]=5.18;r95[21][14]=5.25;r95[21][15]=5.32;r95[21][16]=5.38;r95[21][17]=5.44;r95[21][18]=5.49;r95[21][19]=5.55;r95[21][20]=5.59;
  r95[22][2]=2.89;r95[22][3]=3.49;r95[22][4]=3.85;r95[22][5]=4.1; r95[22][6]=4.3; r95[22][7]=4.46;r95[22][8]=4.6; r95[22][9]=4.72;r95[22][10]=4.82;r95[22][11]=4.92;r95[22][12]=5;   r95[22][13]=5.08;r95[22][14]=5.15;r95[22][15]=5.21;r95[22][16]=5.27;r95[22][17]=5.33;r95[22][18]=5.38;r95[22][19]=5.43;r95[22][20]=5.47;
  r95[23][2]=2.86;r95[23][3]=3.44;r95[23][4]=3.79;r95[23][5]=4.04;r95[23][6]=4.23;r95[23][7]=4.39;r95[23][8]=4.52;r95[23][9]=4.63;r95[23][10]=4.73;r95[23][11]=4.82;r95[23][12]=4.9; r95[23][13]=4.98;r95[23][14]=5.04;r95[23][15]=5.11;r95[23][16]=5.16;r95[23][17]=5.22;r95[23][18]=5.27;r95[23][19]=5.31;r95[23][20]=5.36;
  r95[24][2]=2.83;r95[24][3]=3.4; r95[24][4]=3.74;r95[24][5]=3.98;r95[24][6]=4.16;r95[24][7]=4.31;r95[24][8]=4.44;r95[24][9]=4.55;r95[24][10]=4.65;r95[24][11]=4.73;r95[24][12]=4.81;r95[24][13]=4.88;r95[24][14]=4.94;r95[24][15]=5;   r95[24][16]=5.06;r95[24][17]=5.11;r95[24][18]=5.15;r95[24][19]=5.2; r95[24][20]=5.24;
  r95[25][2]=2.8; r95[25][3]=3.36;r95[25][4]=3.68;r95[25][5]=3.92;r95[25][6]=4.1; r95[25][7]=4.24;r95[25][8]=4.36;r95[25][9]=4.47;r95[25][10]=4.56;r95[25][11]=4.64;r95[25][12]=4.71;r95[25][13]=4.78;r95[25][14]=4.84;r95[25][15]=4.9; r95[25][16]=4.95;r95[25][17]=5;	  r95[25][18]=5.04;r95[25][19]=5.09;r95[25][20]=5.13;
  r95[26][2]=2.77;r95[26][3]=3.31;r95[26][4]=3.63;r95[26][5]=3.86;r95[26][6]=4.03;r95[26][7]=4.17;r95[26][8]=4.29;r95[26][9]=4.39;r95[26][10]=4.47;r95[26][11]=4.55;r95[26][12]=4.62;r95[26][13]=4.68;r95[26][14]=4.74;r95[26][15]=4.8; r95[26][16]=4.85;r95[26][17]=4.89;r95[26][18]=4.93;r95[26][19]=4.97;r95[26][20]=5.01;

  r99[1][2]=90.03;r99[1][3]=135;  r99[1][4]=164.3;r99[1][5]=185.6;r99[1][6]=202.2;r99[1][7]=215.8;r99[1][8]=227.2;r99[1][9]=237;  r99[1][10]=245.6;r99[1][11]=253.2;r99[1][12]=260;  r99[1][13]=266.2;r99[1][14]=271.8;r99[1][15]=277;  r99[1][16]=281.8;r99[1][17]=286.3;r99[1][18]=290.4;r99[1][19]=294.3;r99[1][20]=298;
  r99[2][2]=14.04;r99[2][3]=19.02;r99[2][4]=22.29;r99[2][5]=24.72;r99[2][6]=26.63;r99[2][7]=28.2; r99[2][8]=29.53;r99[2][9]=30.68;r99[2][10]=31.69;r99[2][11]=32.59;r99[2][12]=33.4; r99[2][13]=34.13;r99[2][14]=34.81;r99[2][15]=35.43;r99[2][16]=36;   r99[2][17]=36.53;r99[2][18]=37.03;r99[2][19]=37.5; r99[2][20]=37.95;
  r99[3][2]=8.26; r99[3][3]=10.62;r99[3][4]=12.17;r99[3][5]=13.33;r99[3][6]=14.24;r99[3][7]=15;	  r99[3][8]=15.64;r99[3][9]=16.2; r99[3][10]=16.69;r99[3][11]=17.13;r99[3][12]=17.53;r99[3][13]=17.89;r99[3][14]=18.22;r99[3][15]=18.52;r99[3][16]=18.81;r99[3][17]=19.07;r99[3][18]=19.32;r99[3][19]=19.55;r99[3][20]=19.77;
  r99[4][2]=6.51; r99[4][3]=8.12; r99[4][4]=9.17; r99[4][5]=9.96; r99[4][6]=10.58;r99[4][7]=11.1; r99[4][8]=11.55;r99[4][9]=11.93;r99[4][10]=12.27;r99[4][11]=12.57;r99[4][12]=12.84;r99[4][13]=13.09;r99[4][14]=13.32;r99[4][15]=13.53;r99[4][16]=13.73;r99[4][17]=13.91;r99[4][18]=14.08;r99[4][19]=14.24;r99[4][20]=14.4;
  r99[5][2]=5.7;  r99[5][3]=6.98; r99[5][4]=7.8;  r99[5][5]=8.42; r99[5][6]=8.91; r99[5][7]=9.32; r99[5][8]=9.67; r99[5][9]=9.97; r99[5][10]=10.24;r99[5][11]=10.48;r99[5][12]=10.7; r99[5][13]=10.89;r99[5][14]=11.08;r99[5][15]=11.24;r99[5][16]=11.4; r99[5][17]=11.55;r99[5][18]=11.68;r99[5][19]=11.81;r99[5][20]=11.93;
  r99[6][2]=5.24; r99[6][3]=6.33; r99[6][4]=7.03; r99[6][5]=7.56; r99[6][6]=7.97; r99[6][7]=8.32; r99[6][8]=8.61; r99[6][9]=8.87; r99[6][10]=9.1;  r99[6][11]=9.3;  r99[6][12]=9.48; r99[6][13]=9.65; r99[6][14]=9.81; r99[6][15]=9.95; r99[6][16]=10.08;r99[6][17]=10.21;r99[6][18]=10.32;r99[6][19]=10.43;r99[6][20]=10.54;
  r99[7][2]=4.95; r99[7][3]=5.92; r99[7][4]=6.54; r99[7][5]=7.01; r99[7][6]=7.37; r99[7][7]=7.68; r99[7][8]=7.94; r99[7][9]=8.17; r99[7][10]=8.37; r99[7][11]=8.55; r99[7][12]=8.71; r99[7][13]=8.86; r99[7][14]=9;    r99[7][15]=9.12; r99[7][16]=9.24; r99[7][17]=9.35; r99[7][18]=9.46; r99[7][19]=9.55; r99[7][20]=9.65;
  r99[8][2]=4.75; r99[8][3]=5.64; r99[8][4]=6.2;  r99[8][5]=6.62; r99[8][6]=6.96; r99[8][7]=7.24; r99[8][8]=7.47; r99[8][9]=7.68; r99[8][10]=7.86; r99[8][11]=8.03; r99[8][12]=8.18; r99[8][13]=8.31; r99[8][14]=8.44; r99[8][15]=8.55; r99[8][16]=8.66; r99[8][17]=8.76; r99[8][18]=8.85; r99[8][19]=8.94; r99[8][20]=9.03;
  r99[9][2]=4.6;  r99[9][3]=5.43; r99[9][4]=5.96; r99[9][5]=6.35; r99[9][6]=6.66; r99[9][7]=6.91; r99[9][8]=7.13; r99[9][9]=7.33; r99[9][10]=7.49; r99[9][11]=7.65; r99[9][12]=7.78; r99[9][13]=7.91; r99[9][14]=8.03; r99[9][15]=8.13; r99[9][16]=8.23; r99[9][17]=8.33; r99[9][18]=8.41; r99[9][19]=8.49; r99[9][20]=8.57;
  r99[10][2]=4.48;r99[10][3]=5.27;r99[10][4]=5.77;r99[10][5]=6.14;r99[10][6]=6.43;r99[10][7]=6.67;r99[10][8]=6.87;r99[10][9]=7.05;r99[10][10]=7.21;r99[10][11]=7.36;r99[10][12]=7.49;r99[10][13]=7.6; r99[10][14]=7.71;r99[10][15]=7.81;r99[10][16]=7.91;r99[10][17]=7.99;r99[10][18]=8.08;r99[10][19]=8.15;r99[10][20]=8.23;
  r99[11][2]=4.39;r99[11][3]=5.15;r99[11][4]=5.62;r99[11][5]=5.97;r99[11][6]=6.25;r99[11][7]=6.48;r99[11][8]=6.67;r99[11][9]=6.84;r99[11][10]=6.99;r99[11][11]=7.13;r99[11][12]=7.25;r99[11][13]=7.36;r99[11][14]=7.46;r99[11][15]=7.56;r99[11][16]=7.65;r99[11][17]=7.73;r99[11][18]=7.81;r99[11][19]=7.88;r99[11][20]=7.95;
  r99[12][2]=4.32;r99[12][3]=5.05;r99[12][4]=5.5; r99[12][5]=5.84;r99[12][6]=6.1; r99[12][7]=6.32;r99[12][8]=6.51;r99[12][9]=6.67;r99[12][10]=6.81;r99[12][11]=6.94;r99[12][12]=7.06;r99[12][13]=7.17;r99[12][14]=7.26;r99[12][15]=7.36;r99[12][16]=7.44;r99[12][17]=7.52;r99[12][18]=7.59;r99[12][19]=7.66;r99[12][20]=7.73;
  r99[13][2]=4.26;r99[13][3]=4.96;r99[13][4]=5.4; r99[13][5]=5.73;r99[13][6]=5.98;r99[13][7]=6.19;r99[13][8]=6.37;r99[13][9]=6.53;r99[13][10]=6.67;r99[13][11]=6.79;r99[13][12]=6.9; r99[13][13]=7.01;r99[13][14]=7.1; r99[13][15]=7.19;r99[13][16]=7.27;r99[13][17]=7.35;r99[13][18]=7.42;r99[13][19]=7.48;r99[13][20]=7.55;
  r99[14][2]=4.21;r99[14][3]=4.89;r99[14][4]=5.32;r99[14][5]=5.63;r99[14][6]=5.88;r99[14][7]=6.08;r99[14][8]=6.26;r99[14][9]=6.41;r99[14][10]=6.54;r99[14][11]=6.66;r99[14][12]=6.77;r99[14][13]=6.87;r99[14][14]=6.96;r99[14][15]=7.05;r99[14][16]=7.13;r99[14][17]=7.2; r99[14][18]=7.27;r99[14][19]=7.33;r99[14][20]=7.39;
  r99[15][2]=4.17;r99[15][3]=4.84;r99[15][4]=5.25;r99[15][5]=5.56;r99[15][6]=5.8; r99[15][7]=5.99;r99[15][8]=6.16;r99[15][9]=6.31;r99[15][10]=6.44;r99[15][11]=6.55;r99[15][12]=6.66;r99[15][13]=6.76;r99[15][14]=6.84;r99[15][15]=6.93;r99[15][16]=7;   r99[15][17]=7.07;r99[15][18]=7.14;r99[15][19]=7.2; r99[15][20]=7.26;
  r99[16][2]=4.13;r99[16][3]=4.79;r99[16][4]=5.19;r99[16][5]=5.49;r99[16][6]=5.72;r99[16][7]=5.92;r99[16][8]=6.08;r99[16][9]=6.22;r99[16][10]=6.35;r99[16][11]=6.46;r99[16][12]=6.56;r99[16][13]=6.66;r99[16][14]=6.74;r99[16][15]=6.82;r99[16][16]=6.9; r99[16][17]=6.97;r99[16][18]=7.03;r99[16][19]=7.09;r99[16][20]=7.15;
  r99[17][2]=4.1; r99[17][3]=4.74;r99[17][4]=5.14;r99[17][5]=5.43;r99[17][6]=5.66;r99[17][7]=5.85;r99[17][8]=6.01;r99[17][9]=6.15;r99[17][10]=6.27;r99[17][11]=6.38;r99[17][12]=6.48;r99[17][13]=6.57;r99[17][14]=6.66;r99[17][15]=6.73;r99[17][16]=6.81;r99[17][17]=6.87;r99[17][18]=6.94;r99[17][19]=7;   r99[17][20]=7.05;
  r99[18][2]=4.07;r99[18][3]=4.7; r99[18][4]=5.09;r99[18][5]=5.38;r99[18][6]=5.6; r99[18][7]=5.79;r99[18][8]=5.94;r99[18][9]=6.08;r99[18][10]=6.2; r99[18][11]=6.31;r99[18][12]=6.41;r99[18][13]=6.5; r99[18][14]=6.58;r99[18][15]=6.65;r99[18][16]=6.73;r99[18][17]=6.79;r99[18][18]=6.85;r99[18][19]=6.91;r99[18][20]=6.97;
  r99[19][2]=4.05;r99[19][3]=4.67;r99[19][4]=5.05;r99[19][5]=5.33;r99[19][6]=5.55;r99[19][7]=5.73;r99[19][8]=5.89;r99[19][9]=6.02;r99[19][10]=6.14;r99[19][11]=6.25;r99[19][12]=6.34;r99[19][13]=6.43;r99[19][14]=6.51;r99[19][15]=6.58;r99[19][16]=6.65;r99[19][17]=6.72;r99[19][18]=6.78;r99[19][19]=6.84;r99[19][20]=6.89;
  r99[20][2]=4.02;r99[20][3]=4.64;r99[20][4]=5.02;r99[20][5]=5.29;r99[20][6]=5.51;r99[20][7]=5.69;r99[20][8]=5.84;r99[20][9]=5.97;r99[20][10]=6.09;r99[20][11]=6.19;r99[20][12]=6.28;r99[20][13]=6.37;r99[20][14]=6.45;r99[20][15]=6.52;r99[20][16]=6.59;r99[20][17]=6.65;r99[20][18]=6.71;r99[20][19]=6.77;r99[20][20]=6.82;
  r99[21][2]=3.96;r99[21][3]=4.55;r99[21][4]=4.91;r99[21][5]=5.17;r99[21][6]=5.37;r99[21][7]=5.54;r99[21][8]=5.69;r99[21][9]=5.81;r99[21][10]=5.92;r99[21][11]=6.02;r99[21][12]=6.11;r99[21][13]=6.19;r99[21][14]=6.26;r99[21][15]=6.33;r99[21][16]=6.39;r99[21][17]=6.45;r99[21][18]=6.51;r99[21][19]=6.56;r99[21][20]=6.61;
  r99[22][2]=3.89;r99[22][3]=4.45;r99[22][4]=4.8; r99[22][5]=5.05;r99[22][6]=5.24;r99[22][7]=5.4; r99[22][8]=5.54;r99[22][9]=5.65;r99[22][10]=5.76;r99[22][11]=5.85;r99[22][12]=5.93;r99[22][13]=6.01;r99[22][14]=6.08;r99[22][15]=6.14;r99[22][16]=6.2; r99[22][17]=6.26;r99[22][18]=6.31;r99[22][19]=6.36;r99[22][20]=6.41;
  r99[23][2]=3.82;r99[23][3]=4.37;r99[23][4]=4.7; r99[23][5]=4.93;r99[23][6]=5.11;r99[23][7]=5.26;r99[23][8]=5.39;r99[23][9]=5.5; r99[23][10]=5.6; r99[23][11]=5.69;r99[23][12]=5.76;r99[23][13]=5.83;r99[23][14]=5.9; r99[23][15]=5.96;r99[23][16]=6.02;r99[23][17]=6.07;r99[23][18]=6.12;r99[23][19]=6.16;r99[23][20]=6.21;
  r99[24][2]=3.76;r99[24][3]=4.28;r99[24][4]=4.59;r99[24][5]=4.82;r99[24][6]=4.99;r99[24][7]=5.13;r99[24][8]=5.25;r99[24][9]=5.36;r99[24][10]=5.45;r99[24][11]=5.53;r99[24][12]=5.6; r99[24][13]=5.67;r99[24][14]=5.73;r99[24][15]=5.78;r99[24][16]=5.84;r99[24][17]=5.89;r99[24][18]=5.93;r99[24][19]=5.97;r99[24][20]=6.01;
  r99[25][2]=3.7; r99[25][3]=4.2; r99[25][4]=4.5; r99[25][5]=4.71;r99[25][6]=4.87;r99[25][7]=5.01;r99[25][8]=5.12;r99[25][9]=5.21;r99[25][10]=5.3; r99[25][11]=5.37;r99[25][12]=5.44;r99[25][13]=5.5; r99[25][14]=5.56;r99[25][15]=5.61;r99[25][16]=5.66;r99[25][17]=5.71;r99[25][18]=5.75;r99[25][19]=5.79;r99[25][20]=5.83;
  r99[26][2]=3.64;r99[26][3]=4.12;r99[26][4]=4.4; r99[26][5]=4.6; r99[26][6]=4.76;r99[26][7]=4.88;r99[26][8]=4.99;r99[26][9]=5.08;r99[26][10]=5.16;r99[26][11]=5.23;r99[26][12]=5.29;r99[26][13]=5.35;r99[26][14]=5.4; r99[26][15]=5.45;r99[26][16]=5.49;r99[26][17]=5.54;r99[26][18]=5.57;r99[26][19]=5.61;r99[26][20]=5.65;

  if (df1 < 2 || df1 > 20) {info = 1; return}
  if (df2 < 21) {
    if (p == 0.95) {
      inv = r95[df2][df1];
    }
    else if (p == 0.99) {
      inv = r99[df2][df1];
    }
  }
  else if (df2 < 25) {
    temp = (df2 - 20) / (24 - 20);
    if (p == 0.95) {
      inv = r95[20][df1] + (r95[21][df1]-r95[20][df1])*temp;
    }
    else if (p == 0.99) {
      inv = r99[20][df1] + (r99[21][df1]-r99[20][df1])*temp;
    }
  }
  else if (df2 < 31) {
    temp = (df2 - 24) / (30 - 24);
    if (p == 0.95) {
      inv = r95[21][df1] + (r95[22][df1]-r95[21][df1])*temp;
    }
    else if (p == 0.99) {
      inv = r99[21][df1] + (r99[22][df1]-r99[21][df1])*temp;
    }
  }
  else if (df2 < 41) {
    temp = (df2 - 30) / (40 - 30);
    if (p == 0.95) {
      inv = r95[22][df1] + (r95[23][df1]-r95[22][df1])*temp;
    }
    else if (p == 0.99) {
      inv = r99[22][df1] + (r99[23][df1]-r99[22][df1])*temp;
    }
  }
  else if (df2 < 61) {
    temp = (df2 - 40) / (60 - 40);
    if (p == 0.95) {
      inv = r95[23][df1] + (r95[24][df1]-r95[23][df1])*temp;
    }
    else if (p == 0.99) {
      inv = r99[23][df1] + (r99[24][df1]-r99[23][df1])*temp;
    }
  }
  else if (df2 < 121) {
    temp = (df2 - 60) / (120 -60);
    if (p == 0.95) {
      inv = r95[24][df1] + (r95[25][df1]-r95[24][df1])*temp;
    }
    else if (p == 0.99) {
      inv = r99[24][df1] + (r99[25][df1]-r99[24][df1])*temp;
    }
  }
  else {
    if (p == 0.95) {
      inv = r95[26][df1];
    }
    else if (p == 0.99) {
      inv = r99[26][df1];
    }
  }
  return inv;

}